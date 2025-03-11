const { Accommodation } = require('../models');
const { City } = require('../models');

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
      return res.status(404).json({
        status: 'error',
        message: 'City not found for the given city_number',
        data: null
      });
    }

    // Create a new accommodation
    const accommodation = new Accommodation({
      sourceLink, name, type, description, parentId, pricing,
      amenities, meta, location, isCityPopular, email, phoneNumber,
      tags, featureTags, reviewsCount, reviewsRating, destinationDistance, status
    });

    // Save the accommodation to the database
    await accommodation.save();
    res.status(201).json({
      status: 'success',
      message: 'Accommodation created successfully',
      data: accommodation
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
      data: error.message
    });
  }
};

// Get all accommodations (with optional filtering/searching)
const getAllAccommodations = async (req, res) => {
  try {
    const {
      name, type, city_number, isPopular, priceMin, priceMax, page = 1, limit = 10, sortBy, sortOrder
    } = req.query;

    let query = {};

    // If no query parameters, fetch all accommodations
    if (!Object.keys(req.query).length) {
      // Fetch all accommodations without any filter
      const accommodations = await Accommodation.find().populate('city').skip((page - 1) * limit).limit(limit);
      const totalCount = await Accommodation.countDocuments();
      return res.status(200).json({
        status: 'success',
        message: 'Accommodations fetched successfully',
        data: {
          accommodations,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        }
      });
    }

    // Apply filters based on query parameters
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search for 'name'
    }

    if (type) {
      query.type = type;
    }

    if (city_number) {
      query['location.city_number'] = city_number;
    }

    if (isPopular !== undefined) {
      query.isPopular = isPopular === 'true';  // Convert to boolean
    }

    // Price filter (min and max prices)
    if (priceMin || priceMax) {
      query['pricing.maxPrice'] = {};
      if (priceMin) query['pricing.maxPrice'].$gte = parseInt(priceMin);
      if (priceMax) query['pricing.maxPrice'].$lte = parseInt(priceMax);
    }

    // Pagination
    const skip = (page - 1) * limit;
    const limitValue = parseInt(limit);

    // Sorting
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1; // Default to ascending if no sortOrder is provided
    }

    // Fetch accommodations with the filters and pagination applied
    const accommodations = await Accommodation.find(query)
      .populate('city')  // Populate the 'city' virtual field
      .skip(skip)
      .limit(limitValue)
      .sort(sort);

    const totalCount = await Accommodation.countDocuments(query); // Get the total count for pagination

    // Return the filtered and paginated results along with the total count
    res.status(200).json({
      status: 'success',
      message: 'Accommodations fetched successfully',
      data: {
        accommodations,
        totalCount,
        totalPages: Math.ceil(totalCount / limitValue),
        currentPage: parseInt(page),
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
      data: error.message
    });
  }
};

// Get a single accommodation by ID
const getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id).populate('city');
    if (!accommodation) {
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation not found',
        data: null
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Accommodation fetched successfully',
      data: accommodation
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
      data: error.message
    });
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
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation not found',
        data: null
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Accommodation updated successfully',
      data: updatedAccommodation
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
      data: error.message
    });
  }
};

// Delete an accommodation by ID
const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) {
      return res.status(404).json({
        status: 'error',
        message: 'Accommodation not found',
        data: null
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Accommodation deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
      data: error.message
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
