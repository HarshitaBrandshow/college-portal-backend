const express = require('express');
const router = express.Router();
const{ AccommodationController }= require('../controller'); 

// Routes
router.post('/add-accommodation', AccommodationController.createAccommodation); 
router.get('/all-accommodations', AccommodationController.getAllAccommodations); 
router.get('/accommodations/:id',AccommodationController.getAccommodationById); 
router.put('/accommodations/:id', AccommodationController.updateAccommodationById); 
router.delete('/accommodations/:id',AccommodationController.deleteAccommodationById);

module.exports = router;
