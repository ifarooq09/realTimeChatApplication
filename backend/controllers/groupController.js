const User = require("../models/userModel.js");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index.js');
const Group = require("../models/groupModel.js");

const createGroup = async (req, res) => {
try {
    const { name, members } = req.body
    const userId = req.userId;

    const admin = await User.findById(userId);

    if (!admin) {
        throw new NotFoundError('Admin user not found')
    }

    const validMembers = await User.find({
        _id: {
            $in: members
        }
    })

    if (validMembers.length !== members.length) {
        throw new BadRequestError('Some members are not valid users.')
    }

    const newGroup = new Group({
        name,
        members,
        admin: userId,
    })

    await newGroup.save();
    res.status(StatusCodes.CREATED).json({ group: newGroup })
} catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
}
}


module.exports = {
    createGroup
}