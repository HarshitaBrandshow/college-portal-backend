const mongoose = require('mongoose');

// Define the schema for the cities model
const citySchema = new mongoose.Schema({
  id: {  // Unique identifier for the city
    type: Number,
    required: true,
    unique: true
  },
  name: {  // Name of the city
    type: String,
    required: true
  },
  state_id: {  // ID of the state the city is in
    type: Number,
    required: true
  },
  state_code: {  // Code of the state (e.g., 'NY' for New York)
    type: String,
    required: true
  },
  state_name: {  // Name of the state (e.g., 'New York')
    type: String,
    required: true
  },
  country_id: {  // ID of the country the city is in
    type: Number,
    required: true
  },
  country_code: {  // Code of the country (e.g., 'US' for United States)
    type: String,
    required: true
  },
  country_name: {  // Name of the country (e.g., 'United States')
    type: String,
    required: true
  },
  latitude: {  // Latitude coordinate of the city
    type: Number,
    required: true
  },
  longitude: {  // Longitude coordinate of the city
    type: Number,
    required: true
  },
  wikiDataId: {  // Optional field for the WikiData ID of the city
    type: String,
    required: false
  }
});

// Create and export the model named 'Cities'
const City = mongoose.model('accommodation_cities', citySchema);

module.exports = City;

