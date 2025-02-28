const  { Enquiry } = require('../models'); 

// Create an enquiry
const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, countryCode, status } = req.body;
    
    // Create a new Enquiry instance
    const enquiry = new Enquiry({
      fullName,
      email,
      mobileNumber,
      countryCode,
      status,
    });

    // Save to database
    await enquiry.save();

    return res.status(201).json({
      status: 'success',
      message: 'Enquiry created successfully!',
      data: enquiry, // Send the created enquiry data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error creating enquiry',
      error: error.message, // Include the error message for debugging
    });
  }
};

// Read all enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ deleteFlag: false });

    return res.status(200).json({
      status: 'success',
      message: 'Enquiries fetched successfully!',
      data: enquiries, // Send the list of enquiries
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching enquiries',
      error: error.message, // Include the error message
    });
  }
};

// Read one enquiry by ID
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry || enquiry.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Enquiry fetched successfully!',
      data: enquiry, // Send the fetched enquiry data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching enquiry',
      error: error.message, // Include the error message
    });
  }
};

// Update an enquiry
const updateEnquiry = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, countryCode, status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry || enquiry.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found',
      });
    }

    // Update the fields
    enquiry.fullName = fullName || enquiry.fullName;
    enquiry.email = email || enquiry.email;
    enquiry.mobileNumber = mobileNumber || enquiry.mobileNumber;
    enquiry.countryCode = countryCode || enquiry.countryCode;
    enquiry.status = status || enquiry.status;

    // Save updated enquiry
    await enquiry.save();

    return res.status(200).json({
      status: 'success',
      message: 'Enquiry updated successfully!',
      data: enquiry, // Send the updated enquiry data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error updating enquiry',
      error: error.message, // Include the error message
    });
  }
};

// Delete (soft delete) an enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry || enquiry.deleteFlag) {
      return res.status(404).json({
        status: 'error',
        message: 'Enquiry not found',
      });
    }

    // Soft delete (update the deleteFlag field)
    enquiry.deleteFlag = true;
    await enquiry.save();

    return res.status(200).json({
      status: 'success',
      message: 'Enquiry deleted successfully!',
      data: enquiry, // Send the deleted enquiry data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error deleting enquiry',
      error: error.message, // Include the error message
    });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
