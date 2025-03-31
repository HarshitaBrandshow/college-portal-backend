const { City } = require('../models');

// Create a new city
const createCity = async (req, res) => {
  try {
    const { city_id, name, state_id, state_code, state_name, country_id, latitude, longitude, wikiDataId, isPopular, city_img, c_code, c_name } = req.body;

    // Ensure city_id is unique
    const existingCity = await City.findOne({ city_id });
    if (existingCity) {
      return res.status(400).json({ success: false, message: 'City ID already exists' });
    }

    const newCity = new City({
      city_id,
      name,
      state_id,
      state_code,
      state_name,
      country_id,
      latitude,
      longitude,
      wikiDataId,
      isPopular,
      city_img,
      c_code,
      c_name
    });

    await newCity.save();
    res.status(201).json({ success: true, message: 'City created successfully', data: newCity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cities with optional filters
const getAllCities = async (req, res) => {
  try {
    let { city_id, name, country_id, isPopular } = req.query;
    let filter = {};

    // Apply filters if provided
    if (city_id) filter.city_id = Number(city_id); // Convert to number
    if (name) filter.name = { $regex: new RegExp(name, "i") }; 
    if (country_id) filter.country_id = Number(country_id); 
    if (isPopular) filter.isPopular = isPopular === "true"; 

    // Fetch cities with filters and populate country details
    const cities = await City.find(filter).populate('country_id');

    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single city by city_id
const getCityById = async (req, res) => {
  try {
    const city = await City.findOne({ city_id: req.params.city_id }).populate('country_id');
    if (!city) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a city by city_id
const updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findOneAndUpdate(
      { city_id: req.params.city_id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }

    res.status(200).json({ success: true, message: 'City updated successfully', data: updatedCity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a city by city_id
const deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findOneAndDelete({ city_id: req.params.city_id });

    if (!deletedCity) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }

    res.status(200).json({ success: true, message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
