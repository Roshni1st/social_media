const jwt = require('jsonwebtoken')
const { secretKeys } = require('../configurations/config')
exports.enumValues = (enumObject ,keyToMatch)=>{
    for(const key in enumObject ){
        if(key === keyToMatch){
            return enumObject[key]
        }
    }
    return null
}

exports.generateJwt = (obj) => jwt.sign(obj,secretKeys.jwt)

exports.toObject = (json)=> JSON.parse(JSON.stringify(json))