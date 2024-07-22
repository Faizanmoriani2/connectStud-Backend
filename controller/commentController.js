const Comment = require('../models/commentModel');
const { validationResult } = require('express-validator');

class CommentController {
    async createComment(req, res) {
        try {
            const { content, post } = req.body;
            const author = req.user.id
            const comment = new Comment({ content, author, post });
            const savedComment = await comment.save();
            res.status(201).json(savedComment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getCommentById(req, res) {
        try {
            const commentId = req.params.id;
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateComment(req, res) {
        try {
            const commentId = req.params.id;
            const { content } = req.body;
            const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
            if (!updatedComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json(updatedComment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;
            const deletedComment = await Comment.findByIdAndDelete(commentId);
            if (!deletedComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json({ message: 'Comment deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAllComments(req, res) {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CommentController();
