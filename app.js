const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const passport = require('passport')
const { port } = require('./configurations/config')
const database = require('./connection')
const errorHandler = require('./middlewares/error')
const routes = require('./routes/routes')
database.connect()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api',routes)
app.use(errorHandler)


app.use(passport.initialize());
app.use(passport.session());


app.listen(port,()=>{
    console.log(` Server is running on port:${port}`);
})
module.exports = app