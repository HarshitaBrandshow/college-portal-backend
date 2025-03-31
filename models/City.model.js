const mongoose = require('mongoose');

// Define the schema for the cities model
const citySchema = new mongoose.Schema({
  city_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  state_id: {
    type: Number,
    required: true
  },
  state_code: {
    type: String,
    required: true
  },
  state_name: {
    type: String,
    required: true
  },
  country_id: {
    type: Number,
    ref: 'Country', 
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  wikiDataId: {
    type: String,
    required: false
  },
  isPopular: {
    type: Boolean,
    required: true,
    default: false
  },
  city_img: {
    type: [String],
    required: false
  },
  c_code: {
    type: String,
    required: true
  },
  c_name : {
    type: String,
    required: true
  },
});

// Add a method to populate country data
citySchema.methods.populateCountryData = async function () {
  await this.populate('country_id').execPopulate();
};

// Create and export the model named 'Cities'
const City = mongoose.model('accommodation_cities', citySchema);

module.exports = City;
