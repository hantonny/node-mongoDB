const express = require('express')
const homeController = require('../controllers/homeController')
const usersController = require('../controllers/usersController')
const postController = require('../controllers/postController')
const router = express.Router()

router.get('/', homeController.index)
router.get('/users/login', usersController.login)
router.get('/users/register', usersController.register)

router.get('/post/add', postController.add)
router.post('/post/add', postController.addAction)

router.get('/post/:slug/edit', postController.edit)
router.post('/post/:slug/edit', postController.editAction)

module.exports = router
