const  { Country } = require('../models');  

// Create a new country
const createCountry = async (req, res) => {
  try {
    const newCountry = new Country(req.body);  // Create a new instance using the request body
    await newCountry.save();  // Save the country to the database
    res.status(201).json({ message: 'Country created successfully', country: newCountry });
  } catch (err) {
    res.status(500).json({ message: 'Error creating country', error: err });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();  // Fetch all countries from the database
    res.status(200).json(countries);  // Return the list of countries
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving countries', error: err });
  }
};

// Get a country by ID
const getCountryById = async (req, res) => {
  const { country_id } = req.params;  // Get country_id from request params
  try {
    const country = await Country.findOne({ country_id });  // Find country by country_id
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(country);  // Return the country if found
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving country', error: err });
  }
};

// Update a country by ID
const updateCountry = async (req, res) => {
  const { country_id } = req.params;  // Get country_id from request params
  try {
    const updatedCountry = await Country.findOneAndUpdate(
      { country_id },  // Find country by country_id
      req.body,  // Update the country with the data in request body
      { new: true }  // Return the updated country
    );
    if (!updatedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country updated successfully', country: updatedCountry });
  } catch (err) {
    res.status(500).json({ message: 'Error updating country', error: err });
  }
};

// Delete a country by ID
const deleteCountry = async (req, res) => {
  const { country_id } = req.params;  // Get country_id from request params
  try {
    const deletedCountry = await Country.findOneAndDelete({ country_id });  // Find and delete country by country_id
    if (!deletedCountry) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country deleted successfully', country: deletedCountry });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting country', error: err });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
};
