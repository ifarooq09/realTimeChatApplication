const express = require('express')
const router = express.Router()

const { signup, login, getUserInfo } = require('../controllers/authController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/userInfo').get(authMiddleware, getUserInfo)

module.exports = router;