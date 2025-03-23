const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the data
const universitySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  logo: { type: String, default: null },
  description: { type: String, default: null },
  website: { type: String, default: null },
  address: { type: String, default: null },
  contact: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  isFeatured: { type: Boolean, default: false },

  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true }
  },

  deletedAt: {type: Date,default: null,},
 
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Create and export the model, exlicitly set collection name to 'universities'
const University = mongoose.model('universities', universitySchema);

module.exports = University;
