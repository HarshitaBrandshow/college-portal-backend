const { City } = require('../models'); // Assuming the City model is located in the 'models' folder
const { Country } = require('../models'); // Assuming the Country model is located in the 'models' folder

// Create a new city
const createCity = async (req, res) => {
  try {
    const { city_number, city_name, is_popular, country_number, status, city_img } = req.body;

    // Check if the country exists
    const country = await Country.findOne({ country_number });
    if (!country) {
      return res.status(404).json({ message: 'Country not found for the given country_number' });
    }

    // Check if the city already exists
    const existingCity = await City.findOne({ city_number });
    if (existingCity) {
      return res.status(400).json({ message: 'City with this number already exists.' });
    }

    // Create a new city
    const city = new City({
      city_number,
      city_name,
      is_popular,
      country_number,
      city_img: city_img || [], // Default to empty array if no images are provided
      status: status === undefined ? true : status // default to active (true) status
    });

    // Save to the database
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all cities (can filter by city_number, city_name, and country_number)
const getAllCities = async (req, res) => {
  try {
    const { city_number, city_name, country_number } = req.query; // Get filters from query parameters

    // Build the filter object dynamically
    let filter = { status: true }; // Only active cities

    if (city_number) {
      filter.city_number = city_number; // Filter by city_number if provided
    }

    if (city_name) {
      filter.city_name = { $regex: city_name, $options: 'i' }; // Case-insensitive search by city_name
    }

    if (country_number) {
      filter.country_number = country_number; // Filter by country_number if provided
    }

    // Find cities based on the filter
    const cities = await City.find(filter)
      .populate('country')  // Populate country info based on the country_number
      .exec();

    // Return the cities
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a single city by city_number (only active cities)
const getCityByNumber = async (req, res) => {
  try {
    const { city_number } = req.params;
    const city = await City.findOne({ city_number, status: true }).populate('country'); // Only active cities

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update a city by city_number
const updateCity = async (req, res) => {
  try {
    const { city_number } = req.params;
    const { city_name, is_popular, country_number, status, city_img } = req.body;

    // Check if the country exists
    const country = await Country.findOne({ country_number });
    if (!country) {
      return res.status(404).json({ message: 'Country not found for the given country_number' });
    }

    const city = await City.findOneAndUpdate(
      { city_number, status: true }, // Ensure that only active cities are updated
      { city_name, is_popular, country_number, status, city_img },
      { new: true } // Return the updated city
    );

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Soft delete a city by city_number (set status to false)
const deleteCity = async (req, res) => {
  try {
    const { city_number } = req.params;

    // Update the city to mark it as deleted (set status to false)
    const city = await City.findOneAndUpdate(
      { city_number, status: true }, // Only active cities can be soft deleted
      { status: false }, // Set status to false for soft deletion
      { new: true } // Return the updated city
    );

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityByNumber,
  updateCity,
  deleteCity
};
