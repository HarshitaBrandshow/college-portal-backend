const mongoose = require('mongoose');

const accommodationBookingSchema = new mongoose.Schema({
  // Reference to Accommodation model
  accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },

  // Reference to Enquiry model
  enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'EnquiryNow', required: true },

  // Personal Information
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  fullAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  // University Details
  universityName: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ['Enrolled', 'Not Enrolled'], required: true },

  // Room & Stay Details
  room: { type: String, required: true }, // Example: Single, Double, Suite
  stayDuration: { type: Number, required: true }, // Duration in months
  moveIn: { type: Date, required: true },
  moveOut: { type: Date, required: true },

  // Booking Status
  status: { type: Boolean, default: true }, // True if active, False if canceled or completed

  // Soft Delete Flag
  deleteFlag: { type: Boolean, default: false },

}, { timestamps: true });

// Create a model from the schema
const AccommodationBooking = mongoose.model('AccommodationBooking', accommodationBookingSchema);

module.exports = AccommodationBooking;
