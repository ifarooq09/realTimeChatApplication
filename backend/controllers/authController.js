const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

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

module.exports = {
    signup,
    login
}