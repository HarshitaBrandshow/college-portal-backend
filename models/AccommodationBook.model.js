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

    // Guarantor Details
    guarantorDetails: {
      relation: { type: String, required: true }, // Relation to the person booking (e.g., parent, guardian, etc.)
      guarantorTitle: { type: String, required: true }, // Title (e.g., Mr., Mrs., etc.)
      guarantorName: { type: String, required: true }, // Full name of the guarantor
      guarantorBirthDate: { type: Date, required: true }, // Birth date of the guarantor
      guarantorEmail: { type: String, required: true }, // Email of the guarantor
      guarantorCode: { type: String, required: true }, // Unique code for the guarantor
      guarantorMobiles: { type: [String], required: true }, // Array of phone numbers (mobile) of the guarantor
      guarantorAddress: { type: String, required: true }, // Address of the guarantor
      guarantorCountry: { type: String, required: true }, // Country of the guarantor
      guarantorCity: { type: String, required: true }, // City of the guarantor
      guarantorZipcode: { type: String, required: true }, // Zipcode of the guarantor's address
    },

  // Booking Status
  status: { type: Boolean, default: true }, // True if active, False if canceled or completed

  // Soft Delete Flag
  deleteFlag: { type: Boolean, default: false },


}, { timestamps: true });

// Create a model from the schema
const AccommodationBooking = mongoose.model('AccommodationBooking', accommodationBookingSchema);

module.exports = AccommodationBooking;
