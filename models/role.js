const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({

    name :{
        type : String,
        default:null
    }

})
module.exports = mongoose.model('role',roleSchema)