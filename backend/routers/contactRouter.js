const express = require('express')
const router = express.Router()

const { searchContacts, getContacts } = require('../controllers/contactController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/search').post(authMiddleware, searchContacts)
router.route('/getContactsForIM').get(authMiddleware, getContacts)

module.exports = router

