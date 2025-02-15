const mongoose = require('mongoose');

// Define the schema for storing popular cities in India with status as boolean and timestamps
const PopularCitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The city name is required
    unique: true, // Ensures city name is unique
    trim: true, 
  },
  state: {
    type: String,
    required: true, // State is required
    trim: true,
  },
  country: {
    type: String,
    default: 'India', 
  },
  status: {
    type: Boolean,
    default: true, 
  }
}, { timestamps: true }); 

// Create and export the model
const PopularCity = mongoose.model('PopularCity', PopularCitySchema);
module.exports = PopularCity;
