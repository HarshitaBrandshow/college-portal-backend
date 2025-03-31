const mongoose = require('mongoose');

// Define the schema for the country
const countrySchema = new mongoose.Schema({
  country_id: {
    type: String,   
    unique: true,
  },
 name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
 flag: {
    type: String,
    required: false, 
  },
  dial_code: {
    type: String,
    required: false, 
  },
  isPopular: {
    type: Boolean,
    required: false, 
  },
 
});

// Create a model based on the schema
const Country = mongoose.model('Country', countrySchema);

// Export the model
module.exports = Country;
