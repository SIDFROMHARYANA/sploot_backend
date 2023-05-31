const express = require('express');
const router=express.Router()

const userController = require('../Controllers/Usercontroller')
const articleController = require('../Controllers/Articlecontroller')
const authentication = require('../Middleware/authent')
const authorization = require('../Middleware/authori')


router.post('/signup', userController.createUser)
router.post("/login",userController.login)
router.post('/createarticle', authentication.authent  , articleController.createarticle)
router.get('/articles' , authentication.authent , articleController.getarticle)
router.put('/users/:userid', authorization.authori ,userController.userUpdate)


module.exports = router;
