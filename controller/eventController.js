const Event = require('../models/eventModel');
const mongoose = require('mongoose');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ message: 'Error fetching events' });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error.message);
        res.status(500).json({ message: 'Error fetching event' });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, communityId } = req.body;
        const createdBy = req.user.id

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy,
            community: communityId // Assuming the event is linked to a community
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error.message);
        res.status(500).json({ message: 'Error creating event' });
    }
};

// Update an existing event
const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error.message);
        res.status(500).json({ message: 'Error updating event' });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error.message);
        res.status(500).json({ message: 'Error deleting event' });
    }
};

// Export the controller functions
module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
