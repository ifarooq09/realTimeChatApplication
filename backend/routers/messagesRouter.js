const express = require('express')
const router = express.Router()

const { getMessages, uploadFile } = require('../controllers/messageController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

const multer = require('multer')

const filesUpload = multer({
    dest: "uploads/files"
})

router.route('/getMessages').post(authMiddleware, getMessages)
router.route('/uploadFiles').post(authMiddleware, filesUpload.single("file"), uploadFile)

module.exports = router