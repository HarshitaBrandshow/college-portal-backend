const  {Accommodation } = require('../models');
const  { PopularCitiesAccommodation } = require('../models');

// Create a new accommodation
const createAccommodation = async (req, res) => {
  try {
    const accommodationData = req.body;
    
    // First, create the accommodation in the Accommodation collection
    const newAccommodation = new Accommodation(accommodationData);
    await newAccommodation.save();

    // If 'isCityPopular' is true, create the accommodation in the PopularCitiesAccommodation collection as well
    if (accommodationData.isCityPopular) {
      const newPopularCityAccommodation = new PopularCitiesAccommodation(accommodationData);
      await newPopularCityAccommodation.save();
    }

    res.status(201).json({ message: 'Accommodation created successfully', accommodation: newAccommodation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating accommodation', error });
  }
};

// Get all accommodations (from the Accommodation collection)
const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json({ accommodations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching accommodations', error });
  }
};

// Get all popular city accommodations (from the PopularCitiesAccommodation collection)
const getAllPopularCitiesAccommodations = async (req, res) => {
  try {
    const popularCitiesAccommodations = await PopularCitiesAccommodation.find();
    res.status(200).json({ popularCitiesAccommodations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching popular city accommodations', error });
  }
};

// Update an accommodation (check if isCityPopular is updated, and update accordingly)
const updateAccommodation = async (req, res) => {
  try {
    const accommodationId = req.params.id;
    const updatedData = req.body;

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(accommodationId, updatedData, { new: true });

    if (!updatedAccommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // If 'isCityPopular' has changed to true, add to PopularCitiesAccommodation
    if (updatedData.isCityPopular && !updatedAccommodation.isCityPopular) {
      const newPopularCityAccommodation = new PopularCitiesAccommodation(updatedAccommodation.toObject());
      await newPopularCityAccommodation.save();
    }

    // If 'isCityPopular' has changed to false, remove from PopularCitiesAccommodation
    if (!updatedData.isCityPopular && updatedAccommodation.isCityPopular) {
      await PopularCitiesAccommodation.findByIdAndDelete(updatedAccommodation._id);
    }

    res.status(200).json({ message: 'Accommodation updated successfully', accommodation: updatedAccommodation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating accommodation', error });
  }
};

// Delete an accommodation (delete from both collections if isCityPopular is true)
const deleteAccommodation = async (req, res) => {
  try {
    const accommodationId = req.params.id;
    const accommodation = await Accommodation.findByIdAndDelete(accommodationId);

    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // If isCityPopular is true, also delete from PopularCitiesAccommodation
    if (accommodation.isCityPopular) {
      await PopularCitiesAccommodation.findByIdAndDelete(accommodation._id);
    }

    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting accommodation', error });
  }
};
module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAllPopularCitiesAccommodations,
  updateAccommodation,
  deleteAccommodation,
};

