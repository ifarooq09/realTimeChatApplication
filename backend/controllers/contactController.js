const User = require('../models/userModel.js')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index.js')

const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm || searchTerm.trim() === '') {
            throw new BadRequestError('Search Term is required');
        }

        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(sanitizedSearchTerm, 'i');  // Case-insensitive search

        const contacts = await User.find({
            _id: { $ne: req.userId },
            $or: [
                { firstName: regex },
                { lastName: regex },
                { email: regex }
            ]
        }).limit(50);  // Limit results to avoid overload

        return res.status(StatusCodes.OK).json({ contacts });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    searchContacts
}