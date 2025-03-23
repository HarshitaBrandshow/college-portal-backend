const  {Property } = require('../models'); 

/**
 * Create a new property
 */
const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    const property = new Property(propertyData);
    await property.save();
    return res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

/**
 * Get all properties
 */
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    return res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

/**
 * Get a property by ID
 */
const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

/**
 * Update a property by ID
 */
const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;

    const property = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

/**
 * Delete a property by ID
 */
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;

    const property = await Property.findByIdAndDelete(propertyId);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    return res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
