const express = require('express');
const router = express.Router();
const CommentController = require('../controller/CommentController');
const authenticate = require('../middleware/authenticate');

// Create a new comment
router.post('/', authenticate, CommentController.createComment); // working

// Get all comments
router.get('/', CommentController.getAllComments); // working

// Get a comment by ID
router.get('/:id', authenticate, CommentController.getCommentById); // working

// Update a comment by ID
router.put('/:id', authenticate, CommentController.updateComment); // working

// Delete a comment by ID
router.delete('/:id', CommentController.deleteComment); // working

module.exports = router;
