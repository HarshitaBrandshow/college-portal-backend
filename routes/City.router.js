const express = require('express');
const router = express.Router();
const  { CityController } = require('../controller'); // Assuming the controller is located in the 'controllers' folder

// Create a new city
router.post('/create', CityController.createCity);

// Get all cities (only active cities)
router.get('/cities', CityController.getAllCities);

// Get a single city by city_number (only active cities)
router.get('/:city_number', CityController.getCityByNumber);

// Update a city by city_number
router.put('/:city_number', CityController.updateCity);

// Soft delete a city by city_number (set status to false)
router.delete('/:city_number', CityController.deleteCity);

module.exports = router;
