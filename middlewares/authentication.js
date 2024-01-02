const passport = require('passport')
require('../middlewares/passport')

const handleJWT = (req, res, next, roles) => async (err, user, info) =>     {
    try {
      if(roles !== undefined){
        roles = typeof roles === 'string' ? [roles] : roles ;
        if(!roles.includes(user.role.name))
            throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
      }
      req.user = user;
      return next();
    } catch (err) {next(err);}
  };

exports.isAuth = (roles) => (req,res,next) => {
    passport.authenticate('authentication',{session:false} , handleJWT(req,res,next,roles))(req,res,next)
}