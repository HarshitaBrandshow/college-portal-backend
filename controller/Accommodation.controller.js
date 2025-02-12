const { Accommodation } = require('../models');

// Create a new Accommodation
const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();
    res.status(201).json({
      status: true,
      data: savedAccommodation,
      message: 'Accommodation created successfully.',
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

// Get all Accommodations with Search and Filter Functionality
const getAllAccommodations = async (req, res) => {
  try {
    const { 
      name, type, city, state, country, 
      minPrice, maxPrice, minRating, maxRating 
    } = req.query;

    // Initialize the filter object
    const filter = {};
    let search = false;

    // If any search parameters (name, type, city, state, country) are provided
    if (name || type || city || state || country) {
      search = true;

      // Apply search filters (case-insensitive matching using regex)
      if (name) filter.name = { $regex: name, $options: 'i' };
      if (type) filter.type = { $regex: type, $options: 'i' };
      if (city) filter['location.city'] = { $regex: city, $options: 'i' };
      if (state) filter['location.state'] = { $regex: state, $options: 'i' };
      if (country) filter['location.country'] = { $regex: country, $options: 'i' };
    }

    // If filter parameters (price, rating) are provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = parseFloat(minRating);
      if (maxRating) filter.rating.$lte = parseFloat(maxRating);
    }

    // Fetch the accommodations based on search or filter criteria
    const accommodations = await Accommodation.find(filter);

    // Return the result based on search or filter
    if (search) {
      // If it's a search request, return the search result only
      res.status(200).json({
        status: true,
        data: accommodations,
        message: accommodations.length
          ? 'Search results retrieved successfully.'
          : 'No accommodations found matching your search criteria.',
      });
    } else {
      // If it's just a filter request, return the filtered result only
      res.status(200).json({
        status: true,
        data: accommodations,
        message: accommodations.length
          ? 'Filtered accommodations retrieved successfully.'
          : 'No accommodations found matching your filter criteria.',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};


// Get a single Accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found.',
      });
    }
    res.status(200).json({
      status: true,
      data: accommodation,
      message: 'Accommodation retrieved successfully.',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

// Update an Accommodation by ID
const updateAccommodation = async (req, res) => {
  try {
    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAccommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found.',
      });
    }
    res.status(200).json({
      status: true,
      data: updatedAccommodation,
      message: 'Accommodation updated successfully.',
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

// Delete an Accommodation by ID
const deleteAccommodation = async (req, res) => {
  try {
    const deletedAccommodation = await Accommodation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAccommodation) {
      return res.status(404).json({
        status: false,
        data: null,
        message: 'Accommodation not found.',
      });
    }
    res.status(200).json({
      status: true,
      data: deletedAccommodation,
      message: 'Accommodation deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation
};
