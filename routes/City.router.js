const express = require('express');
const router = express.Router();
const  { CityController } = require('../controller'); // Import the controller

// Create a new city
router.post('/create', CityController.createCity);

// Get all cities
router.get('/cities', CityController.getAllCities);

// Get a specific city by ID
router.get('/:id', CityController.getCityById);

// Update a city by ID
router.put('/:id', CityController.updateCity);

// Delete a city by ID
router.delete('/:id', CityController.deleteCity);

module.exports = router;
