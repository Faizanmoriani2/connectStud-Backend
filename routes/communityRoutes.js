const express = require('express');
const router = express.Router();
const CommunityController = require('../controller/communityController');

// Routes for community operations
router.post('/create', CommunityController.createCommunity); // working
router.get('/', CommunityController.getAllCommunities); // working
router.get('/:id', CommunityController.getCommunityById); // working
router.put('/:id', CommunityController.updateCommunity); // working
router.delete('/:id', CommunityController.deleteCommunity); // working
router.post('/addMember', CommunityController.addMember); // working
router.post('/removeMember', CommunityController.removeMember); // working

module.exports = router;
