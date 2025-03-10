const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country_number: {
    type: Number,
    required: true,
    unique: true
  },
  country_name: {
    type: String,
    required: true
  },
  is_popular: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  },
  deleteFlag: {
    type: Boolean,
    default: false
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
