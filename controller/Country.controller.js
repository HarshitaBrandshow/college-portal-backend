const  { Country }  = require('../models');

// Create a new country
const createCountry = async (req, res) => {
  try {
    const { country_id, country_name, country_code, country_img } = req.body;
    const newCountry = new Country({ country_id, country_name, country_code, country_img });
    await newCountry.save();
    res.status(201).json({ message: 'Country created successfully', data: newCountry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating country', error: error.message });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json({ data: countries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries', error: error.message });
  }
};

// Get a single country by ID
const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findOne({ country_id: id });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ data: country });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country', error: error.message });
  }
};

// Update a country by ID
const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCountry = await Country.findOneAndUpdate(
      { country_id: id },
      req.body,
      { new: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country updated successfully', data: updatedCountry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating country', error: error.message });
  }
};

// Delete a country by ID
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCountry = await Country.findOneAndDelete({ country_id: id });
    if (!deletedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting country', error: error.message });
  }
};
module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry
};
