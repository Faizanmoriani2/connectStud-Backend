const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');
const authenticate = require('../middleware/authenticate');

// Create a new post
router.post('/', authenticate,PostController.createPost); // working

// Get a post by ID
router.get('/:id', authenticate, PostController.getPostById); // working

// Get all posts
router.get("/", PostController.getAllPosts) // working

// Update a post by ID
router.put('/:id', authenticate, PostController.updatePost); // working

// Delete a post by ID
router.delete('/:id', authenticate, PostController.deletePost); // working

module.exports = router;
