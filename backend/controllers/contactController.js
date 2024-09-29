const User = require('../models/userModel.js')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index.js');
const mongoose = require('mongoose');
const Message = require('../models/messageModel.js');

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

const getContacts = async (req, res) => {
    try {
        let { userId } = req;
        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },
            {
                $sort: { timestamp: -1 } 
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender",
                        },
                    },
                    lastMessageTime: { $first: "$timestamp" }, 
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo",
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    image: "$contactInfo.image",
                    color: "$contactInfo.color",
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        return res.status(StatusCodes.OK).json({ contacts });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
}

const getAllContacts = async (req, res) => {
    try {
        const users = await User.find(
            { _id: {
                $ne: req.userId
            }},
            "firstName lastName _id email"
        )

        const contacts = users.map((user) => ({
            label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
            value: user._id
        }))
        return res.status(StatusCodes.OK).json({ contacts });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    searchContacts,
    getContacts,
    getAllContacts
}