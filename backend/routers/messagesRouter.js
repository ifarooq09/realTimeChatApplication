const express = require('express')
const router = express.Router()

const { getMessages } = require('../controllers/messageController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/getMessages').post(authMiddleware, getMessages)

module.exports = router