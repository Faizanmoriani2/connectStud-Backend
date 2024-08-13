const express = require('express');
const router = express.Router();
const CommunityController = require('../controller/communityController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/uploadMiddleware');

// Routes for community operations
router.post('/create', authenticate, upload.single('coverImage'),CommunityController.createCommunity); // working
router.get('/', CommunityController.getAllCommunities); // working
router.get('/:id', authenticate,CommunityController.getCommunityById); // working
router.put('/:id', authenticate,CommunityController.updateCommunity); // working
router.delete('/:id', CommunityController.deleteCommunity); // working
router.post('/addMember', CommunityController.addMember); // working
router.post('/removeMember', CommunityController.removeMember); // working

module.exports = router;
