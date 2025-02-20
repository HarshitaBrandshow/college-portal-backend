const { Accommodation } = require('../models');

// Create Accommodation
const createAccommodation = async (req, res) => {
  try {
    const newAccommodation = new Accommodation(req.body);
    await newAccommodation.save();

    return res.status(201).json({
      msg: 'Accommodation created successfully.',
      data: newAccommodation,
      status: true
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error creating accommodation.',
      data: error.message,
      status: false
    });
  }
};

// Smart Search and Filter
const getAllAccommodations = async (req, res) => {
  try {
    const { name, city, minPrice, maxPrice, type } = req.query;

    // Build the query object for MongoDB
    let query = {};

    // Smart Search using $text for name and city
    if (name || city) {
      query = { $text: { $search: `${name || ''} ${city || ''}` } };
    }

    // Filter by name using regex (for partial and fuzzy search)
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    // Filter by type
    if (type) {
      query.type = { $regex: type, $options: 'i' }; // Case-insensitive search
    }

    // Filter by city
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' }; // Case-insensitive search
    }

    // Price Range Filter (smart filter)
    if (minPrice && maxPrice) {
      query['pricing.minPrice'] = { $gte: minPrice };
      query['pricing.maxPrice'] = { $lte: maxPrice };
    } else if (minPrice) {
      query['pricing.minPrice'] = { $gte: minPrice };
    } else if (maxPrice) {
      query['pricing.maxPrice'] = { $lte: maxPrice };
    }

    // Fetch accommodations with the query
    const accommodations = await Accommodation.find(query);
    
    return res.status(200).json({
      msg: 'Accommodations fetched successfully.',
      data: accommodations,
      status: true
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error fetching accommodations.',
      data: error.message,
      status: false
    });
  }
};

// Get Single Accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({
        msg: 'Accommodation not found.',
        data: null,
        status: false
      });
    }

    return res.status(200).json({
      msg: 'Accommodation fetched successfully.',
      data: accommodation,
      status: true
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error fetching accommodation.',
      data: error.message,
      status: false
    });
  }
};

// Update Accommodation by ID
const updateAccommodationById = async (req, res) => {
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAccommodation) {
      return res.status(404).json({
        msg: 'Accommodation not found.',
        data: null,
        status: false
      });
    }

    return res.status(200).json({
      msg: 'Accommodation updated successfully.',
      data: updatedAccommodation,
      status: true
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error updating accommodation.',
      data: error.message,
      status: false
    });
  }
};

// Delete Accommodation by ID
const deleteAccommodationById = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!deletedAccommodation) {
      return res.status(404).json({
        msg: 'Accommodation not found.',
        data: null,
        status: false
      });
    }

    return res.status(200).json({
      msg: 'Accommodation deleted successfully.',
      data: deletedAccommodation,
      status: true
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Error deleting accommodation.',
      data: error.message,
      status: false
    });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodationById,
  deleteAccommodationById
};
