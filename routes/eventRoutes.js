const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');
const authenticate = require('../middleware/authenticate');

// Define routes and map them to controller functions
router.get('/', eventController.getAllEvents); // working
router.get('/:id',authenticate, eventController.getEventById); // working
router.post('/', authenticate,eventController.createEvent); // working
router.put('/:id',authenticate, eventController.updateEvent); // working
router.delete('/:id',authenticate, eventController.deleteEvent); // working

module.exports = router;
