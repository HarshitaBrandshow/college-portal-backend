const express = require('express');
const router = express.Router();
const  { CountryController } = require('../controller'); // Assuming the controller is located in the 'controllers' folder

// Create a new country
router.post('/create', CountryController.createCountry);

// Get all countries
router.get('/countries', CountryController.getAllCountries);

// Get a single country by country_number
router.get('/:country_number', CountryController.getCountryByNumber);

// Update a country by country_number
router.put('/:country_number', CountryController.updateCountry);

// Soft delete a country by country_number (set status to false)
router.delete('/:country_number', CountryController.deleteCountry);

module.exports = router;
