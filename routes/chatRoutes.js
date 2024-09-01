const express = require('express');
const router = express.Router();
const Chat = require('../models/ChatModel');
const validateToken = require('../middleware/validateTokenHandler');

// Create or fetch a chat between two users
router.post('/', validateToken, async (req, res) => {
    const { userId1, userId2 } = req.body;

    try {
        let chat = await Chat.findOne({ members: { $all: [userId1, userId2] } });

        if (!chat) {
            chat = new Chat({ members: [userId1, userId2] });
            await chat.save();
        }

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all chats for a user
router.get('/:userId', validateToken, async (req, res) => {
    try {
        const chats = await Chat.find({ members: req.params.userId }).populate('members', 'username');
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
