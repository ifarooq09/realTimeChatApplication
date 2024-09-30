const User = require("../models/userModel.js");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index.js');
const Group = require("../models/groupModel.js");
const { default: mongoose } = require("mongoose");

const createGroup = async (req, res) => {
    try {
        const { name, members } = req.body;
        const userId = req.userId;

        const admin = await User.findById(userId);
        if (!admin) {
            throw new NotFoundError('Admin user not found');
        }

        const validMembers = await User.find({
            _id: { $in: members }
        });

        if (validMembers.length !== members.length) {
            throw new BadRequestError('Some members are not valid users.');
        }

        const newGroup = new Group({
            name,
            members,
            admin: userId,
        });

        await newGroup.save();
        res.status(StatusCodes.CREATED).json({ group: newGroup });
    } catch (error) {
        console.error('Error in createGroup controller:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || 'Something went wrong' });
    }
};

const getUserGroups = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId)
        const groups = await Group.find({
            $or: [{ admin: userId }, { members: userId }],
        }).sort({ updatedAt: -1 });

        res.status(StatusCodes.CREATED).json({ groups });
    } catch (error) {
        console.error('Error in getUserGroups controller:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || 'Something went wrong' });
    }
}

const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const channel = await Group.findById(groupId).populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "firstName lastName email _id image color"
            }
        })
        if (!channel) {
            throw new NotFoundError('Group not found.')
        }

        const messages = channel.messages
        res.status(StatusCodes.OK).json({ messages })
    } catch (error) {
        console.error('Error in getUserGroups controller:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || 'Something went wrong' });
    }
}

module.exports = {
    createGroup,
    getUserGroups,
    getGroupMessages
}