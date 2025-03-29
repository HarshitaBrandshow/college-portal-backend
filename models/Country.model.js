const mongoose = require('mongoose');

// Define the schema for the country
const countrySchema = new mongoose.Schema({
  country_id: {
    type: String,   // Or Number depending on your use case
    required: true,
    unique: true,   
  },
  country_name: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
  },
  country_img: {
    type: String,   
    required: false, // If it's optional
  },
});

// Create a model based on the schema
const Country = mongoose.model('Country', countrySchema);

// Export the model
module.exports = Country;
