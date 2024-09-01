// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
