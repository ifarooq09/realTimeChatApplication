const express = require('express')
const router = express.Router()

const { createGroup, getUserGroups, getGroupMessages } = require('../controllers/groupController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/createGroup').post(authMiddleware, createGroup)
router.route('/getUserGroups').get(authMiddleware, getUserGroups)
router.route('/getGroupMessages/:groupId').get(authMiddleware, getGroupMessages)

module.exports = router;