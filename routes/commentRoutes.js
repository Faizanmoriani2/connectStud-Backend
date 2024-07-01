const express = require('express');
const router = express.Router();
const CommentController = require('../controller/CommentController');

// Create a new comment
router.post('/', CommentController.createComment); // working

// Get all comments
router.get('/', CommentController.getAllComments); // working

// Get a comment by ID
router.get('/:id', CommentController.getCommentById); // working

// Update a comment by ID
router.put('/:id', CommentController.updateComment); // working

// Delete a comment by ID
router.delete('/:id', CommentController.deleteComment); // working

module.exports = router;
