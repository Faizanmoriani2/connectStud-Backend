const Post = require('../models/postModel'); 

async function createPost(req, res) {
    try {
        const { content, community } = req.body;
        const author = req.user.id;
        let imagePath = '';

        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        // Check if the user is a member of the community [Not Working]
        // const communityData = await Community.findById(community);
        // if (!communityData.members.includes(author)) {
        //     return res.status(403).json({ error: 'Only community members can create posts' });
        // }

        // Create the post if the user is a member
        const post = new Post({ content, author, community, image: imagePath });
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

async function getPostsByCommunity(req, res) {
    try {
        const communityId = req.params.communityId;
        const posts = await Post.find({ community: communityId })
            .populate('author', 'name email') // Populate author with their name and email
            .sort({ createdAt: -1 }); // Sort posts by creation date, latest first
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params; // Post ID
        const { content, image } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(id).populate('community');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // const community = await Community.findById(post.community._id);

        // if (post.author.toString() !== userId && community.createdBy.toString() !== userId) {
        //     return res.status(403).json({ error: 'You are not authorized to edit this post' });
        // }

        post.content = content || post.content;
        post.image = image || post.image;

        await post.save();

        res.json(post);
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
    getAllPosts,
    getPostsByCommunity
};
