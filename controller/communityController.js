const Community = require('../models/communityModel'); 
const User = require('../models/userModel'); 
const mongoose = require('mongoose');
const upload = require("../middleware/uploadMiddleware")
const multer = require('multer');
const path = require('path')

// Controller to handle CRUD operations for the Community model
const CommunityController = {
  
  // Create a new community
  createCommunity: async (req, res) => {
    try {
      const { name, description } = req.body;
      const createdBy = req.user.id;
      let coverImage = '';

    if (req.file) {
      coverImage = `/${req.file.path}`;  // Prepend '/' to ensure correct path
    } else {
      coverImage = '/uploads/default-image.jpg'; // Use a default image if none is uploaded
    }
      // const coverImage = '/'+ req.file ? req.file.path : '/uploads/default.jpg'
      
      // Check if the community name already exists
      const existingCommunity = await Community.findOne({ name });
      if (existingCommunity) {
        return res.status(400).json({ message: 'Community name already exists.' });
      }

      // Create a new community
      const newCommunity = new Community({
        name,
        description,
        createdBy,
        coverImage
      });
      console.log(req.file)
      await newCommunity.save();
      
      res.status(201).json({ message: 'Community created successfully.', community: newCommunity });
    } catch (error) {
      res.status(500).json({ message: 'Error creating community', error });
    }
  },

  // Get all communities
  getAllCommunities: async (req, res) => {
    try {
      const communities = await Community.find().populate('createdBy', 'username')
      res.status(200).json(communities);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching communities', error });
    }
  },

  // Get a community by ID
  getCommunityById: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate if ID is a proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid community ID.' });
      }

      const community = await Community.findById(id)
      // .populate('createdBy', 'name').populate('members', 'name').populate('events');
      

      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }

      res.status(200).json(community);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching community', error });
    }
  },

  // Update a community by ID
 // Update a community by ID
updateCommunity: async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let coverImage;

    // Validate if ID is a proper ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid community ID.' });
    }

    // Find the community by ID
    const community = await Community.findById(id);

    // Check if community exists
    if (!community) {
      return res.status(404).json({ message: 'Community not found.' });
    }

    // Check if the current user is the creator of the community
    if (community.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to edit this community' });
    }

    // Handle the cover image update
    if (req.file) {
      coverImage = `/${req.file.path}`;
    }

    // Update only the provided fields
    if (name) community.name = name;
    if (description) community.description = description;
    if (coverImage) community.coverImage = coverImage;

    const updatedCommunity = await community.save();

    res.status(200).json({ message: 'Community updated successfully.', community: updatedCommunity });
  } catch (error) {
    res.status(500).json({ message: 'Error updating community', error });
  }
}

  
,

  // Delete a community by ID
  deleteCommunity: async (req, res) => {
    try {
      const { id } = req.params;

      // Validate if ID is a proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid community ID.' });
      }

      const deletedCommunity = await Community.findByIdAndDelete(id);

      if (!deletedCommunity) {
        return res.status(404).json({ message: 'Community not found.' });
      }

      res.status(200).json({ message: 'Community deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting community', error });
    }
  },

  // Add a member to a community
  addMember: async (req, res) => {
    try {
      const { communityId, userId } = req.body;

      // Validate if IDs are proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(communityId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid community or user ID.' });
      }

      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Add user to the members list if not already a member
      if (!community.members.includes(userId)) {
        community.members.push(userId);
        await community.save();
      }

      res.status(200).json({ message: 'Member added to community successfully.', community });
    } catch (error) {
      res.status(500).json({ message: 'Error adding member to community', error });
    }
  },

  // Remove a member from a community
  removeMember: async (req, res) => {
    try {
      const { communityId, userId } = req.body;

      // Validate if IDs are proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(communityId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid community or user ID.' });
      }

      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ message: 'Community not found.' });
      }

      // Remove user from the members list
      community.members = community.members.filter(member => member.toString() !== userId);
      await community.save();

      res.status(200).json({ message: 'Member removed from community successfully.', community });
    } catch (error) {
      res.status(500).json({ message: 'Error removing member from community', error });
    }
  }
};

module.exports = CommunityController;

