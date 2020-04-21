const express = require('express')
const homeController = require('../controllers/homeController')
const usersController = require('../controllers/usersController')
const router = express.Router()

router.get('/', homeController.userMiddleware, homeController.index)
router.get('/users/login', usersController.login)
router.get('/users/register', usersController.register)

module.exports = router
