const  { City } = require('../models'); 

// Create a new city
const createCity = async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).json({ success: true, message: 'City created successfully', data: newCity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all cities 
const getAllCities = async (req, res) => {
  try {
    let { city_id, name, country_id, isPopular } = req.query;
    let filter = {};

    // Apply filters if provided
    if (city_id) filter.city_id = city_id;
    if (name) filter.name = { $regex: new RegExp(name, "i") }; 
    if (country_id) filter.country_id = country_id;
    if (isPopular) filter.isPopular = isPopular === "true"; 

    // Fetch cities with filters and populate country details
    const cities = await City.find(filter).populate('country_id');

    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single city by ID
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('country_id');
    if (!city) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a city
const updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCity) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    res.status(200).json({ success: true, message: 'City updated successfully', data: updatedCity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id);
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
