const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');

// Define routes and map them to controller functions
router.get('/', eventController.getAllEvents); // working
router.get('/:id', eventController.getEventById); // working
router.post('/', eventController.createEvent); // working
router.put('/:id', eventController.updateEvent); // working
router.delete('/:id', eventController.deleteEvent); // working

module.exports = router;
