const  { AccommodationBook } = require('../models'); // Adjust path accordingly

// Create a new Accommodation Booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new AccommodationBook(req.body);
    await newBooking.save();
    return res.status(201).json({
      status: 'success',
      message: 'Accommodation booking created successfully!',
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating the booking.',
      error: error.message,
    });
  }
};

// Get all Accommodation Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await AccommodationBook.find({ deleteFlag: false });
    return res.status(200).json({
      status: 'success',
      message: 'Accommodation bookings fetched successfully!',
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching bookings.',
      error: error.message,
    });
  }
};

// Get a single Accommodation Booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await AccommodationBook.findOne({ _id: req.params.id, deleteFlag: false });
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation booking not found.',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Accommodation booking fetched successfully!',
      data: booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the booking.',
      error: error.message,
    });
  }
};

// Update an Accommodation Booking
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await AccommodationBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation booking not found.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Accommodation booking updated successfully!',
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the booking.',
      error: error.message,
    });
  }
};

// Soft delete an Accommodation Booking (set deleteFlag to true)
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await AccommodationBook.findByIdAndUpdate(
      req.params.id,
      { deleteFlag: true },
      { new: true }
    );

    if (!deletedBooking) {
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation booking not found.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Accommodation booking deleted successfully!',
      data: deletedBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the booking.',
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
