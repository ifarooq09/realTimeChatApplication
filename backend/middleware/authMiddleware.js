const jwt = require('jsonwebtoken')
const UnauthenicatedError = require('../errors/unauthenticatedError')
const { BadRequestError } = require('../errors')

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt
    
    if (!token) {
        throw new UnauthenicatedError('You are not authenticated')
    }

    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
        if (err) {
            throw new BadRequestError('Token is not valid')
        }

        req.userId = payload.userId;
        next()
    })
}

module.exports = authMiddleware