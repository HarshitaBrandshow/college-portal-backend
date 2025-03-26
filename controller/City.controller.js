const { City } = require('../models'); // Import the city model

// Create a new city (Create)
const createCity = async (req, res) => {
  const { city_id, name, state_id, state_code, state_name, country_id, country_code, country_name, latitude, longitude, wikiDataId, isPopular, city_img } = req.body;

  // Validate the input data
  if (!city_id || !name || !state_id || !state_code || !state_name || !country_id || !country_code || !country_name || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new city document
    const newCity = new City({
      city_id,
      name,
      state_id,
      state_code,
      state_name,
      country_id,
      country_code,
      country_name,
      latitude,
      longitude,
      wikiDataId,
      isPopular: isPopular || false, // Default to false if not provided
      city_img: city_img || [] // Default to empty array if not provided
    });

    // Save the city to the database
    await newCity.save();

    // Respond with the created city data
    res.status(201).json({
      message: 'City created successfully',
      city: newCity,
    });
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all cities (Read All)
const getAllCities = async (req, res) => {
  const { search, ...filters } = req.query; // Destructure search and other filters from query parameters

  try {
    // Initialize the query object
    let query = {};

    // If 'search' parameter is provided, use it to search across multiple fields
    if (search) {
      query = {
        $or: [
          { city_id: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'city_id'
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'name'
          { country_id: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'country_id'
          { country_name: { $regex: search, $options: 'i' } }, // Case-insensitive search on 'country_name'
        ],
      };
    }

    // If filters are provided (other than search), add them to the query
    const filterQuery = Object.keys(filters).reduce((query, key) => {
      if (filters[key]) {
        query[key] = filters[key]; // Dynamically add filter conditions to query
      }
      return query;
    }, {});

    // Combine the search and filter query (if any)
    query = { ...query, ...filterQuery };

    // Get the cities from the database based on the query
    const cities = await City.find(query).exec(); // No pagination, just filter based on the query

    // Respond with the result
    res.status(200).json(cities); // Return the cities list
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific city by city_id (Read Specific)
const getCityById = async (req, res) => {
  const { city_id } = req.params;

  try {
    const city = await City.findOne({ city_id }); // Find a city by its city_id
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json(city); // Respond with the city data
  } catch (error) {
    console.error('Error fetching city:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a city by city_id (Update)
const updateCity = async (req, res) => {
  const { city_id } = req.params;
  const { name, state_id, state_code, state_name, country_id, country_code, country_name, latitude, longitude, wikiDataId, isPopular, city_img } = req.body;

  try {
    const updatedCity = await City.findOneAndUpdate(
      { city_id },  // Find city by city_id
      { 
        name, 
        state_id, 
        state_code, 
        state_name, 
        country_id, 
        country_code, 
        country_name, 
        latitude, 
        longitude, 
        wikiDataId,
        isPopular,
        city_img 
      },
      { new: true }  // Return the updated city
    );

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({
      message: 'City updated successfully',
      city: updatedCity,
    });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a city by city_id (Delete)
const deleteCity = async (req, res) => {
  const { city_id } = req.params;

  try {
    const deletedCity = await City.findOneAndDelete({ city_id });  // Find and delete the city by city_id
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({
      message: 'City deleted successfully',
      city: deletedCity,
    });
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
