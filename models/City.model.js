const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city_number: {
    type: Number,
    required: true,
    unique: true
  },
  city_name: {
    type: String,
    required: true
  },
  is_popular: {
    type: Boolean,
    default: false
  },
  country_number: {  // This will reference the country_number in the Country model
    type: Number,
    required: true
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

// In this case, we will use a virtual property to allow population of country name based on country_number
citySchema.virtual('country', {
  ref: 'Country',            // The model to refer to (Country)
  localField: 'country_number',  // The field in the City model (country_number)
  foreignField: 'country_number',  // The field in the Country model (country_number)
  justOne: true               // Return a single document, as one country is related to one city
});

// Make sure to set the virtual fields in JSON output
citySchema.set('toJSON', { virtuals: true });
citySchema.set('toObject', { virtuals: true });

const City = mongoose.model('City', citySchema);

module.exports = City;
