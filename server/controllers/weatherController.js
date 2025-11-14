// server/controllers/weatherController.js
const axios = require('axios');
const Location = require('../models/Location');

const API_KEY = process.env.API_KEY;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather`;

// Get weather data from OpenWeatherMap
const getWeather = async (req, res) => {
  try {
    const location = req.params.location;
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric', // or 'imperial' for Fahrenheit
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).send('Server Error');
    }
  }
};

// Save a location to the database
const saveLocation = async (req, res) => {
  const { name } = req.body;
  try {
    let location = await Location.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (location) {
      return res.status(400).json({ msg: 'Location already exists' });
    }
    location = new Location({ name });
    await location.save();
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all saved locations from the database
const getSavedLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ date: -1 });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getWeather,
  saveLocation,
  getSavedLocations,
};