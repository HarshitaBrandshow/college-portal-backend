const  { PopularCity } = require('../models'); 

// Create a new city
const createCity = async (req, res) => {
  const { name, state, country, status } = req.body;

  try {
    const existingCity = await PopularCity.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ message: 'City already exists' });
    }

    const newCity = new PopularCity({
      name,
      state,
      country: country || 'India',
      status: status !== undefined ? status : true,
    });

    await newCity.save();
    res.status(201).json({ status: 'success', message: 'City added successfully', data: newCity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while adding the city' });
  }
};

// Get all cities with optional search and filter
const getAllCities = async (req, res) => {
  const { name, status, page = 1, limit = 10 } = req.query;

  // Build search and filter criteria
  let searchCriteria = {};

  if (name) {
    searchCriteria.name = new RegExp(name, 'i'); // Case-insensitive search for city name
  }

  if (status !== undefined) {
    searchCriteria.status = status === 'true'; // Convert status string to boolean
  }

  try {
    // Paginate the results
    const cities = await PopularCity.find(searchCriteria)
      .skip((page - 1) * limit) // Skip based on the page number
      .limit(Number(limit)); // Limit the number of results per page

    const totalCities = await PopularCity.countDocuments(searchCriteria); // Get total number of cities for pagination

    res.status(200).json({
      status: 'success',
      message: 'Cities fetched successfully',
      data: cities,
      totalCities,
      currentPage: page,
      totalPages: Math.ceil(totalCities / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while fetching cities' });
  }
};

// Get a city by name
const getCityByName = async (req, res) => {
  const { name } = req.params;

  try {
    const city = await PopularCity.findOne({ name });
    if (!city) {
      return res.status(404).json({ status: 'error', message: 'City not found' });
    }
    res.status(200).json({ status: 'success', message: 'City fetched successfully', data: city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while fetching the city' });
  }
};

// Update city by ID
const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name, state, country, status } = req.body;

  try {
    const city = await PopularCity.findById(id);
    if (!city) {
      return res.status(404).json({ status: 'error', message: 'City not found' });
    }

    city.name = name || city.name;
    city.state = state || city.state;
    city.country = country || city.country;
    city.status = status !== undefined ? status : city.status;

    await city.save();
    res.status(200).json({ status: 'success', message: 'City updated successfully', data: city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while updating the city' });
  }
};

// Delete city by ID
const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await PopularCity.findById(id);
    if (!city) {
      return res.status(404).json({ status: 'error', message: 'City not found' });
    }

    await city.remove();
    res.status(200).json({ status: 'success', message: 'City deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while deleting the city' });
  }
};

module.exports = {
    createCity,
    getAllCities,
    getCityByName,
    updateCity,
    deleteCity,
    };
