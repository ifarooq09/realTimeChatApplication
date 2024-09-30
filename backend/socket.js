const { Server } = require("socket.io");
const Message = require("./models/messageModel.js");
const Group = require("./models/groupModel.js");

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        }
    })

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color");

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("recieveMessage", messageData);
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("recieveMessage", messageData);
        }
    };

    const sendGroupMessage = async (message) => {
        const { groupId, sender, content, messageType, fileUrl } = message;
    
        const createdMessage = await Message.create({
            sender,
            recipient: null,
            content,
            messageType,
            timestamp: new Date(),
            fileUrl
        });
    
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .exec();
    
        await Group.findByIdAndUpdate(groupId, {
            $push: {
                messages: createdMessage._id
            }
        });
    
        const group = await Group.findById(groupId)
            .populate("members")
            .populate("admin");  // Populate admin field
    
        const finalData = {
            ...messageData._doc,
            groupId: group._id
        };
    
        if (group && group.members) {
            group.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    io.to(memberSocketId).emit("receiveGroupMessage", finalData);
                }
            });
    
            // Check if admin is populated and handle multiple admins if it's an array
            if (Array.isArray(group.admin)) {
                group.admin.forEach((admin) => {
                    const adminSocketId = userSocketMap.get(admin._id.toString());
                    if (adminSocketId) {
                        io.to(adminSocketId).emit("receiveGroupMessage", finalData);
                    }
                });
            } else if (group.admin) {
                const adminSocketId = userSocketMap.get(group.admin._id.toString());
                if (adminSocketId) {
                    io.to(adminSocketId).emit("receiveGroupMessage", finalData);
                }
            }
        }
    };
    


    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
            console.log("User ID not provided during connection.")
        }

        socket.on("sendMessage", sendMessage)
        socket.on("sendGroupMessage", sendGroupMessage)
        socket.on("disconnect", () => disconnect(socket));
    })
}

module.exports = setupSocket