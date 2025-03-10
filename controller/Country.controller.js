const { Country } = require('../models');

// Create a new country
const createCountry = async (req, res) => {
  try {
    const { country_number, country_name, is_popular, status } = req.body;

    // Ensure status is a Boolean
    const validStatus = typeof status === 'boolean' ? status : true; // Default to true if status is not provided

    // Check if country already exists
    const existingCountry = await Country.findOne({ country_number });
    if (existingCountry) {
      return res.status(400).json({ message: 'Country with this number already exists.' });
    }

    // Create new country
    const country = new Country({
      country_number,
      country_name,
      is_popular,
      status: validStatus,  // Ensure status is Boolean
    });

    // Save to the database
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a single country by country_number
const getCountryByNumber = async (req, res) => {
  try {
    const { country_number } = req.params;
    const country = await Country.findOne({ country_number });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update a country by country_number
const updateCountry = async (req, res) => {
  try {
    const { country_number } = req.params;
    const { country_name, is_popular, status } = req.body;

    // Ensure status is a Boolean
    const validStatus = typeof status === 'boolean' ? status : true; // Default to true if status is not provided

    const country = await Country.findOneAndUpdate(
      { country_number },
      { country_name, is_popular, status: validStatus }, // Update with the valid status
      { new: true } // Return the updated document
    );

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Soft delete a country by country_number (set status to false)
const deleteCountry = async (req, res) => {
  try {
    const { country_number } = req.params;

    // Soft delete the country by setting status to false
    const country = await Country.findOneAndUpdate(
      { country_number },
      { status: false },  // Mark status as false for soft deletion
      { new: true }
    );

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryByNumber,
  updateCountry,
  deleteCountry
};
