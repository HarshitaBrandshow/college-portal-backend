const express = require('express');
const router = express.Router();
const  { AccommodationController } = require('../controller');

// Create a new accommodation
router.post('/create', AccommodationController.createAccommodation);

// Get all accommodations with filtering and searching
router.get('/all-accommodations', AccommodationController.getAllAccommodations);

// Get a single accommodation by ID
router.get('/:id', AccommodationController.getAccommodationById);

// Update an accommodation by ID
router.put('/:id', AccommodationController.updateAccommodation);

// Delete an accommodation by ID
router.delete('/:id', AccommodationController.deleteAccommodation);

module.exports = router;
