const errorHandler = (err, req,res,next) => {

    const errStatus = err.statusCode || 500;

    let errMsg;
    if(err.details){
        if(err.details.body){
            errMsg = err.details.body[0].message;
        }else if(err.details.params){
            errMsg = err.details.params[0].message;
        }else if(err.details.query){
            errMsg = err.details.query[0].message;
        }else{
            errMsg = err.message;
        }

    }
    res.status(errStatus).json({
        status:errStatus,
        error: err.message,
        message:errMsg
    })
}

module.exports = errorHandler;
