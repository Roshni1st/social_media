const mongoose = require('mongoose')
require('dotenv').config()
const { dbUrl } = require('./configurations/config')

const connect = async ()=>{
    try{
        const connection = await mongoose.connect(dbUrl)
        if(connection) console.log("Database connected successfully");

    }catch(err){
        console.log("Error while connecting to database",err);

    }
}
module.exports = {
    connect
}