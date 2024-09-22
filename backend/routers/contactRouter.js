const express = require('express')
const router = express.Router()

const { searchContacts } = require('../controllers/contactController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/search').post(authMiddleware, searchContacts)

module.exports = router

