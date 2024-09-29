const express = require('express')
const router = express.Router()

const { searchContacts, getContacts, getAllContacts } = require('../controllers/contactController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/search').post(authMiddleware, searchContacts)
router.route('/getContactsForIM').get(authMiddleware, getContacts)
router.route('/getAllContacts').get(authMiddleware, getAllContacts)

module.exports = router

