const express = require('express')
const { validate } = require('express-validation')
const router = express.Router()
const USER = require('../controller/user')
const { register ,login } = require('../validations/user')
const { isAuth } = require('../middlewares/authentication')
router.get('/',isAuth(['user']),(req,res)=>{
    res.send("hello world")
})

router.post('/register',validate(register),USER.register)
router.post('/login',validate(login),USER.login)


module.exports = router