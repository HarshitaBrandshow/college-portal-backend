const express = require('express');
const router = express.Router();
const  { AccommodationController } = require('../controller');

router.post('/create', AccommodationController.createAccommodation);
router.get('/accommodations', AccommodationController.getAllAccommodations);
router.get('/popularcitiesaccommodation', AccommodationController.getAllPopularCitiesAccommodations);
router.put('/:id', AccommodationController.updateAccommodation);
router.delete('/:id', AccommodationController.deleteAccommodation);

module.exports = router;
