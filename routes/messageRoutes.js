const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Get all messages for a chat
router.get('/:chatId', async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId }).populate('sender', 'username');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Send a new message
router.post('/', async (req, res) => {
    const { chatId, senderId, message } = req.body;

    try {
        const newMessage = new Message({ chatId, sender: senderId, message });
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
