const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    timestamp: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;