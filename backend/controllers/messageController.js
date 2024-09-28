const Message = require('../models/messageModel.js')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index.js')
const { renameSync, mkdirSync } = require('fs')

const getMessages = async (req, res) => {
    try {
        const user1 = req.userId;
        const user2 = req.body.id;

        if (!user1 || !user2) {
            throw new UnauthenticatedError('Both user IDs are required')
        }

        const messages = await Message.find({
            $or: [
                {
                    sender: user1, recipient: user2
                },
                {
                    sender: user2, recipient: user1
                }
            ]
        }).sort({ timestamp: 1 });

        return res.status(StatusCodes.OK).json({ messages });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
}

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            throw new NotFoundError('File is required');
        }

        const date = Date.now(); // Correct way to get the current timestamp
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${req.file.originalname}`;

        mkdirSync(fileDir, {
            recursive: true
        });

        renameSync(req.file.path, fileName);

        return res.status(StatusCodes.OK).json({ filePath: fileName });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    getMessages,
    uploadFile
}