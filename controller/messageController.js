const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

const sendMessage = asyncHandler(async (req, res) => {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        message,
    });

    res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const messages = await Message.find({
        $or: [
            { sender: userId },
            { receiver: userId },
        ]
    }).populate('sender receiver', 'username email').sort({ createdAt: -1 });

    res.status(200).json(messages);
});

module.exports = {
    sendMessage,
    getMessages,
};
