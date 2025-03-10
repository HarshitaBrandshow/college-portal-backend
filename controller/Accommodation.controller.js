const  { Accommodation } = require('../models');
const  { City } = require('../models');

// Create a new accommodation
const createAccommodation = async (req, res) => {
  try {
    const {
      sourceLink, name, type, description, parentId, pricing,
      amenities, meta, location, isCityPopular, email, phoneNumber,
      tags, featureTags, reviewsCount, reviewsRating, destinationDistance, status
    } = req.body;

    // Check if the city exists based on city_number
    const city = await City.findOne({ city_number: location.city_number });
    if (!city) {
      return res.status(404).json({ message: 'City not found for the given city_number' });
    }

    // Create a new accommodation
    const accommodation = new Accommodation({
      sourceLink, name, type, description, parentId, pricing,
      amenities, meta, location, isCityPopular, email, phoneNumber,
      tags, featureTags, reviewsCount, reviewsRating, destinationDistance, status
    });

    // Save the accommodation to the database
    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all accommodations with filtering and searching
const getAllAccommodations = async (req, res) => {
  try {
    const { name, type, city_number, isCityPopular } = req.query;

    let query = {};

    // Apply filters based on query parameters
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (type) {
      query.type = type;
    }
    if (city_number) {
      query['location.city_number'] = city_number;
    }
    if (isCityPopular !== undefined) {
      query.isCityPopular = isCityPopular === 'true';
    }

    // Fetch accommodations with the filters applied
    const accommodations = await Accommodation.find(query).populate('city');
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a single accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id).populate('city');
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update an accommodation by ID
const updateAccommodation = async (req, res) => {
  try {
    const {
      sourceLink, name, type, description, parentId, pricing,
      amenities, meta, location, isCityPopular, email, phoneNumber,
      tags, featureTags, reviewsCount, reviewsRating, destinationDistance, status
    } = req.body;

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      {
        sourceLink, name, type, description, parentId, pricing,
        amenities, meta, location, isCityPopular, email, phoneNumber,
        tags, featureTags, reviewsCount, reviewsRating, destinationDistance, status
      },
      { new: true } // This ensures the updated document is returned
    );

    if (!updatedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    res.status(200).json(updatedAccommodation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete an accommodation by ID
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation
};
