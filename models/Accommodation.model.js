const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodationSchema = new Schema({
  sourceLink: { type: String },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Hostel', 'PG', 'Apartment'], 
    required: true 
  },
  description: {                                   
    short_description: { type: String },              
    long_description: { type: String },         
  },
  parentId: { type: String },
  pricing: {
    currency: { type: String, required: true },
    duration: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    minPrice: { type: Number, required: true },
    minDeposit: { type: Number, required: true },
    refundable: { type: Boolean },
    maxAvailablePrice: { type: Number, required: true },
  },
  amenities: { type: [String], required: true },  
  meta: {
    facts: [{
      name: { type: String, required: true },
      count: { type: Number, required: true },
      value: { type: String, required: true },
    }],
    types: [{
      type: String,
      enum: [
        'private room', 'shared kitchen', 'shared bathroom',
        'entire place', 'private kitchen', 'private bathroom'
      ],
    }],
    payment: { type: Boolean, required: true },
    ranking: { type: Number, required: true },
    croTags: [{
      tag: { type: String },
      description: { type: String },
    }],
    maxArea: { type: Number },
    minArea: { type: Number },
    mAreaCount: { type: Number },
    distance: { type: Number },
    loginUrl: { type: String },
    unitType: { type: String },
    metaTitle: { type: String },
    unitCount: { type: Number },
    unitTypes: [{
      type: String,
      enum: ['ensuite', 'studio', 'student accommodation'],
    }],
    isInternal: { type: Boolean },
    isPartnered: { type: Boolean },
    paymentType: { type: String },
    priceTrends: {
      trends: [{ type: String }],
      avgRegionPricing: { type: Number },
      forecastingPercentChange: { type: Number },
      increasePricePercentChange: { type: Number },
      inventoryCostPercentChange: { type: Number },
    },
    metaKeywords: [{ type: String }],
    sortPriority: { type: Number },
    dualOccupancy: { type: Boolean },
    reviewSummary: {
      rating: {
        staff: { type: Number },
        social: { type: Number },
        cleaning: { type: Number },
        location: { type: Number },
        amenities: { type: Number },
        valueForMoney: { type: Number },
      },
      summary: { type: String },
    },
    availableType: [{
      type: String,
      enum: ['shared kitchen', 'private room', 'private bathroom', 'private kitchen', 'entire place'],
    }],
    communityFacts: {
      inc: { type: String },
    },
    isSeoOptimised: { type: Boolean },
    metaDescription: { type: String },
    maxBedroomCount: { type: Number },
    minBedroomCount: { type: Number },
    guarantorRequired: { type: Boolean },
    maxAvailableFrom: { type: Date },
    minBathroomCount: { type: Number },
    minLeaseDuration: { type: Number },
    totalVideosCount: { type: Number },
    featuredImagePath: { type: String },
    leaseDurationUnit: { type: String },
    isAutoSynced: { type: Boolean },
    yearOfConstruction: { type: Number },
    averagePropertyPrice: { type: Number },
    isBooking: { type: Boolean },
    apiEnable: { type: Boolean },
    lastMonthLeadsCount: { type: Number },
    images: [{ type: String }],
    videos: [{ type: String }],
  },
  location: {
    city_number: { type: Number, required: true },  // Changed from city to city_number
    route: { type: String, required: true },
    locality: { type: String, required: true },
    secondary: { type: String, required: true },
    postalCode: { type: String, required: true },
    streetNumber: { type: String, required: true },
    latitude: { type: Number, required: true },  // Add latitude
    longitude: { type: Number, required: true }, // Add longitude
    features: [{
      name: { type: String },
      types: { type: String },
      value: [{ type: String }],
    }],
  },
  isPopular: { type: Boolean, default: false },
  email: { type: String, required: true }, 
  phoneNumber: { type: String, required: true },
  tags: [{
    type: String,
    enum: ['laundry facility', 'gym', 'bills included', 'dual occupancy'],
  }],
  featureTags: [{
    tag: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
    shortText: { type: String },
    displayName: { type: String },
    policyApplicable: { type: Boolean },
  }],
  reviewsCount: { type: Number },
  reviewsRating: { type: Number },
  destinationDistance: { type: Number },
  status: { type: Boolean, default: true },
  deleteflag: { type: Boolean, default: false },
}, {
  timestamps: true  // Enable automatic `createdAt` and `updatedAt` timestamps
});

// Virtual field to populate city_name from City model
accommodationSchema.virtual('city', {
  ref: 'City',              // Referring to the 'City' model
  localField: 'location.city_number', // Field in Accommodation model
  foreignField: 'city_number',        // Field in City model
  justOne: true             // To fetch a single city
});

// Ensure the virtual fields are included in JSON output
accommodationSchema.set('toJSON', { virtuals: true });
accommodationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Accommodation', accommodationSchema);
