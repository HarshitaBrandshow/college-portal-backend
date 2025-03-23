const  { PropertyDetail } = require('../models');

// Create Property Detail
const createPropertyDetail = async (req, res) => {
  try {
    const propertyDetail = new PropertyDetail(req.body);
    await propertyDetail.save();
    res.status(201).json({ message: "Property Detail created successfully", propertyDetail });
  } catch (error) {
    res.status(500).json({ message: "Error creating property detail", error: error.message });
  }
};

const getAllPropertyDetails = async (req, res) => {
    try {
      const propertyDetails = await PropertyDetail.find();
      if (propertyDetails.length === 0) {
        return res.status(404).json({ message: "No property details found" });
      }
      res.status(200).json({
        message: "Property details retrieved successfully",
        data: propertyDetails
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving property details", error: error.message });
    }
  };
  

// Get a Property Detail by ID
const getPropertyDetailById = async (req, res) => {
  try {
    const propertyDetail = await PropertyDetail.findById(req.params.id);
    if (!propertyDetail) {
      return res.status(404).json({ message: "Property Detail not found" });
    }
    res.status(200).json(propertyDetail);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property detail", error: error.message });
  }
};

// Update Property Detail by ID
const updatePropertyDetail = async (req, res) => {
  try {
    const propertyDetail = await PropertyDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!propertyDetail) {
      return res.status(404).json({ message: "Property Detail not found" });
    }
    res.status(200).json({ message: "Property Detail updated successfully", propertyDetail });
  } catch (error) {
    res.status(500).json({ message: "Error updating property detail", error: error.message });
  }
};

// Delete Property Detail by ID
const deletePropertyDetail = async (req, res) => {
  try {
    const propertyDetail = await PropertyDetail.findByIdAndDelete(req.params.id);
    if (!propertyDetail) {
      return res.status(404).json({ message: "Property Detail not found" });
    }
    res.status(200).json({ message: "Property Detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property detail", error: error.message });
  }
};

module.exports = {
    createPropertyDetail,
    getAllPropertyDetails,
    getPropertyDetailById,
    updatePropertyDetail,
    deletePropertyDetail
    };
