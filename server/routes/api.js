const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// @route   GET api/weather/:location
// @desc    Get weather for a specific location from API
// @access  Public
router.get('/weather/:location', weatherController.getWeather);

// @route   POST api/locations
// @desc    Save a new location
// @access  Public
router.post('/locations', weatherController.saveLocation);

// @route   GET api/locations
// @desc    Get all saved locations
// @access  Public
router.get('/locations', weatherController.getSavedLocations);

module.exports = router;