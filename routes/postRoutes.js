const express = require('express');
const router = express.Router();
const PostController = require('../controller/postController');

// Create a new post
router.post('/', PostController.createPost); // working

// Get a post by ID
router.get('/:id', PostController.getPostById); // working

// Get all posts
router.get("/", PostController.getAllPosts) // working

// Update a post by ID
router.put('/:id', PostController.updatePost); // working

// Delete a post by ID
router.delete('/:id', PostController.deletePost); // working

module.exports = router;
