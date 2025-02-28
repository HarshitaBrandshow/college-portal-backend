const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  countryCode: { type: String, required: true },
  status: { type: Boolean},
  deleteFlag: { type: Boolean, default: false },
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
