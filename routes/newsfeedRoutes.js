const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const Community = require('../models/communityModel');
const Comment = require('../models/commentModel');
const validateToken = require('../middleware/validateTokenHandler');

// Get newsfeed posts
router.get('/', validateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch communities the user is a member of
        const communities = await Community.find({ members: userId });

        let posts = [];
        if (communities.length > 0) {
            const communityIds = communities.map(community => community._id);
            
            // Fetch posts from these communities and sort by newest first
            posts = await Post.find({ community: { $in: communityIds } })
                .populate('community', 'name')
                .populate('author', 'username profileImage')
                .sort({ createdAt: -1 }) // Newest posts first
                .limit(20);

            // Manually fetch and attach comments to each post
            for (let post of posts) {
                const comments = await Comment.find({ post: post._id })
                    .populate('author', 'username profileImage')
                    .sort({ timestamp: -1 });
                post._doc.comments = comments; // Attach comments to post
            }
        }

        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
