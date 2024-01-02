const ROLE = require('../models/role')
const USER = require('../models/user')
const { enumValues, generateJwt, toObject } = require('../utils/helper')
const { USER_ROLES } = require('../utils/enums')

/**
 * User register
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.register = async (req,res,next)=>{
 try{
     let userPayload = req.body 
     let error
     let { role } = userPayload
     let roleEnum  = enumValues(USER_ROLES,role)
     const roleFound = await ROLE.findOne({name:roleEnum});
   
     if(!roleFound){
        error.statusCode = 404;
        err.message = 'It seems that the system role are not generated yet.'
        throw new Error(error);
    }

     userPayload.role = roleFound._id
    let user = await USER.create(userPayload)
    res.status(200).json({user,message:"Registration Done!!!"})

 }catch(error){
   next(error)
   
 }
}

/**
 * User login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

exports.login = async (req,res,next)=>{
  try{
     const { email , password} = req.body
     let user = await USER.findOne({email:email}).
     populate({path:'role',select:'name'})
    
     const validate = await user.isValidPassword(password);

     if (!validate) {
       return done(null, false, { message: 'Wrong Password' });
     }
     
     let body = { _id:user._id,email:user.email}
     let token = generateJwt({user:body})
     user = toObject(user)
     user.token = "Bearer "+token
     res.status(200).json({user,message:"Logged In Sucessfully!!!"})


  }catch(error){
    next(error)
  }

}