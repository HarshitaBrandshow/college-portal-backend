const express = require('express');
const router = express.Router();
const  { AccommodationBookController } = require('../controller');

router.post('/create', AccommodationBookController.createBooking);

// Get all Accommodation Bookings
router.get('/all', AccommodationBookController.getAllBookings);

// Get a single Accommodation Booking by ID
router.get('/:id', AccommodationBookController.getBookingById);

// Update an Accommodation Booking
router.put('/:id', AccommodationBookController.updateBooking);

// Soft delete an Accommodation Booking
router.delete('/:id', AccommodationBookController.deleteBooking);

module.exports = router;


