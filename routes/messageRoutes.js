const express = require('express');
const { sendMessage, getMessages } = require('../controller/messageController');
// const { protect } = require('../middleware/authMiddleware');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/', validateToken, sendMessage); // Send a message
router.get('/:receiverId', validateToken, getMessages); // Get messages with a specific user

module.exports = router;
