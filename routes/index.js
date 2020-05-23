const express = require('express')
const homeController = require('../controllers/homeController')
const usersController = require('../controllers/usersController')
const postController = require('../controllers/postController')
const imageMiddleware = require('../middlewares/imageMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/', homeController.index)

router.get('/users/login', usersController.login)
router.post('/users/login', usersController.loginAction)
router.get('/users/logout', usersController.logout)

router.get('/users/register', usersController.register)
router.post('/users/register', usersController.registerAction)

router.get('/users/forget', usersController.forget)
router.post('/users/forget', usersController.forgetAction)
router.get('/users/reset/:token', usersController.forgetToken)
router.post('/users/reset/:token', usersController.forgetTokenAction)

router.get('/profile', authMiddleware.isLogged, usersController.profile)
router.post('/profile', authMiddleware.isLogged, usersController.profileAction)

router.post('/profile/password', authMiddleware.isLogged, authMiddleware.changePassword)

router.get('/post/add', authMiddleware.isLogged, postController.add)
router.post('/post/add',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  postController.addAction)

router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit)
router.post('/post/:slug/edit',
  authMiddleware.isLogged,
  imageMiddleware.upload,
  imageMiddleware.resize,
  postController.editAction)

router.get('/post/:slug', postController.view)

module.exports = router
