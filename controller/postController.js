const Post = require('../models/postModel'); 
async function createPost(req, res) {
    try {
        const { content, community, event } = req.body;
        const author = req.user.id;
        const post = new Post({ content, author, community, event });
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getPostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts
};
