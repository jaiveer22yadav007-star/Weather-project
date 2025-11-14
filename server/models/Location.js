const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Location = mongoose.model('location', LocationSchema);