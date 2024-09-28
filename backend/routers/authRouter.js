const express = require('express')
const router = express.Router()

const { signup, login, getUserInfo, updateProfile, addProfileImage, removeProfileImage, logout } = require('../controllers/authController.js')

const authMiddleware = require('../middleware/authMiddleware.js')

const multer = require('multer')

const upload = multer({
    dest: "uploads/profiles"
})

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/userInfo').get(authMiddleware, getUserInfo)
router.route('/updateProfile').post(authMiddleware, updateProfile)
router.route('/addProfileImage').post(authMiddleware, upload.single("profileImage"), addProfileImage)
router.route('/removeProfileImage').delete(authMiddleware, removeProfileImage)
router.route('/logout').post(logout)

module.exports = router;