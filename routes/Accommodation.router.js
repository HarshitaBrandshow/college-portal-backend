const express = require('express');
const router = express.Router();
const{ AccommodationController }= require('../controller'); 

// Routes
router.post('/add-accommodation', AccommodationController.createAccommodation); // Ensure this method exists in the controller
router.get('/all-accommodations', AccommodationController.getAllAccommodations); // Ensure this method exists
router.get('/accommodations/:id',AccommodationController.getAccommodationById); // Ensure this method exists
router.put('/accommodations/:id', AccommodationController.updateAccommodationById); // Ensure this method exists
router.delete('/accommodations/:id',AccommodationController.deleteAccommodationById); // Ensure this method exists

module.exports = router;
