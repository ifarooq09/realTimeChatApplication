const express = require('express')
const router = express.Router()

const { createGroup } = require('../controllers/groupController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/createGroup').post(authMiddleware, createGroup)

module.exports = router;