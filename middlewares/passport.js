const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT =  require('passport-jwt').ExtractJwt

const { secretKeys } = require('../configurations/config')
const USER = require('../models/user')

const jwtStrategyOpts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : secretKeys.jwt
}

const authenticateJwtStrategy = async(jwtPayload,done)=>{
    try{
     let user = await USER.findOne({_id:jwtPayload.user._id}).populate({path:'role',select:'name'})
     console.log("============",user);
     if(user) {
        return done(null,user)
     }
     else{
        return done('Invalid access token')
     }
    }catch(error){
         done(error)
    }
}

passport.use('authentication',new JWTstrategy(jwtStrategyOpts,authenticateJwtStrategy))