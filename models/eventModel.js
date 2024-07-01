const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Add a pre-save hook to update the updatedAt field
  EventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create and export the Event model
  const Event = mongoose.model('Event', EventSchema);
  
  module.exports = Event;
  
  