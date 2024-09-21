const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const { renameSync, unlinkSync } = require('fs')

const signup = async (req, res, next) => {
    try {
        // Extract data from request body
        const { email, password } = req.body;

        if (!email || !password) {
            throw new NotFoundError('Email or Password not provided')
        }

        // Check if user already exist
        const existngUser = await User.findOne({ email })
        if (existngUser) {
            res.status(400).json({ message: 'User already exist' })
        }
        // Create a new user
        const user = new User({ email, password });

        // Generate JWT token and save it in the user document
        const token = await user.generateAuthToken();

        // Save the user to the database
        await user.save();

        //Set JWT in a cookie
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'Strict',
            httpOnly: true
        })

        // Respond with user data and token
        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup
            },
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }
        next(error);
    }
}

// Login controller
const login = async (req, res, next) => {
    try {
        // Extract data from request body
        const { email, password } = req.body;

        // Check whether email and password are provided
        if (!email || !password) {
            throw new BadRequestError('Please provide email and passsword')
        }

        // check whether user exists or not
        const user = await User.findOne({ email })

        if (!user) {
            throw new UnauthenticatedError('User does not exist')
        }

        // check whether password matches
        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Password')
        }

        // Generate token
        const token = await user.generateAuthToken();

        await user.save()

        //Set JWT in a cookie
        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'Strict',
            httpOnly: true
        })

        // Respond with user data
        res.status(StatusCodes.CREATED).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color
            },
        })

    } catch (error) {
        console.error('Login Error; ', error)
        next(error)
    }
}

const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId)
        if (!userData) {
            throw new NotFoundError('User with the given id not found.')
        }

        res.status(StatusCodes.CREATED).json({

            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color

        })

    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server Error")
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const { userId } = req
        const { firstName, lastName, color } = req.body

        if (!firstName || !lastName) {
            throw new NotFoundError('Please fill all the required fields')
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                color,
                profileSetup: true,
            },
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(StatusCodes.CREATED).json({

            id: userData._id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color

        })
    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server Error")
    }
}

const addProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            throw new NotFoundError('File not found.')
        }

        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname
        renameSync(req.file.path, fileName)

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {
                image: fileName
            },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(StatusCodes.CREATED).json({
            image: updatedUser.image
        })
    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server Error")
    }
}

const removeProfileImage = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId)

        if (!user) {
            throw new NotFoundError('User not found.')
        }

        if (user.image) {
            unlinkSync(user.image)
        }

        user.image = null
        await user.save();

        return res.status(StatusCodes.CREATED).json({ msg: "Profile image removed successfully." })
    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server Error")
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 1,
            secure: true,
            sameSite: "None"
        })

        return res.status(StatusCodes.CREATED).json({ msg: "Logout Successfully." })

    } catch (error) {
        console.log({ error })
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    signup,
    login,
    getUserInfo,
    updateProfile,
    addProfileImage,
    removeProfileImage,
    logout
}