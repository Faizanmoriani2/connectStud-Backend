const Message = require('../models/messageModel');

// @desc    Fetch all messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user contains the logged-in user's ID
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 }); // Sort messages by timestamp

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Send a new message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;

        if (!message || !receiverId) {
            return res.status(400).json({ message: 'Message content and receiver ID are required' });
        }

        const newMessage = new Message({
            senderId: req.user.id, // Assuming req.user contains the logged-in user's ID
            receiverId,
            message,
        });

        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send message' });
    }
};

module.exports = {
    getMessages,
    sendMessage,
};
