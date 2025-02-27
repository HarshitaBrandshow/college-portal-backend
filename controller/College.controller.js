const { College } = require("../models");

// Create College
const createCollege = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      phone,
      email,
      established_year,
      affiliated_university,
      college_type,
      ranking,
      accreditation,
      placement_details,
      hostel_availability,
      scholarship_details,
      location,
      images,
      datasheet_url,
      website_url,
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        status: false,
        message: "Name, Phone, and Email are required fields.",
        data: false,
      });
    }

    // Validate data types
    if (established_year && isNaN(Number(established_year))) {
      return res.status(400).json({
        status: false,
        message: "Established year must be a number.",
        data: false,
      });
    }

    if (ranking && isNaN(Number(ranking))) {
      return res.status(400).json({
        status: false,
        message: "Ranking must be a number.",
        data: false,
      });
    }

    // Avoid duplicate email or phone
    const existingCollege = await College.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingCollege) {
      return res.status(409).json({
        status: false,
        message: "A college with the same email or phone already exists.",
        data: false,
      });
    }

    // Create a new College instance
    const newCollege = new College({
      name,
      city,
      state,
      phone,
      email,
      established_year,
      affiliated_university,
      college_type,
      ranking,
      accreditation,
      placement_details,
      hostel_availability,
      scholarship_details,
      location,
      images,
      datasheet_url,
      website_url,
    });

    // Save to database
    const savedCollege = await newCollege.save();

    return res.status(201).json({
      status: true,
      message: "College created successfully.",
      data: savedCollege,
    });
  } catch (error) {
    console.error("Error creating college:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: false,
        message: "Validation failed.",
        data: error.message,
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        status: false,
        message: "Duplicate entry detected.",
        data: error.keyValue,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

const getAllColleges = async (req, res) => {
  try {
    const { search = "", city, state, phone, email, affiliated_university, accreditation, scholarship_details, website_url } = req.query;

    const filter = {};  // Initialize filter object
    let result = [];

    // Fetch all colleges first
    result = await College.find(); 

    // If a search term is provided, filter results across multiple fields
    if (search) {
      const searchRegex = new RegExp(search, "i");
      result = result.filter(college => {
        return (
          new RegExp(searchRegex).test(college.name) ||
          new RegExp(searchRegex).test(college.city) ||
          new RegExp(searchRegex).test(college.state) ||
          new RegExp(searchRegex).test(college.phone) ||
          new RegExp(searchRegex).test(college.email) ||
          new RegExp(searchRegex).test(college.affiliated_university) ||
          new RegExp(searchRegex).test(college.accreditation) ||
          new RegExp(searchRegex).test(college.scholarship_details) ||
          new RegExp(searchRegex).test(college.website_url)
        );
      });
    }

    // Apply filters if provided
    if (city) filter.city = { $regex: new RegExp(city, "i") };
    if (state) filter.state = { $regex: new RegExp(state, "i") };
    if (phone) filter.phone = { $regex: new RegExp(phone, "i") };
    if (email) filter.email = { $regex: new RegExp(email, "i") };
    if (affiliated_university) filter.affiliated_university = { $regex: new RegExp(affiliated_university, "i") };
    if (accreditation) filter.accreditation = { $regex: new RegExp(accreditation, "i") };
    if (scholarship_details) filter.scholarship_details = { $regex: new RegExp(scholarship_details, "i") };
    if (website_url) filter.website_url = { $regex: new RegExp(website_url, "i") };

    // If filters are applied, filter the result further
    if (Object.keys(filter).length > 0) {
      result = result.filter(college => {
        return Object.keys(filter).every(key => {
          return new RegExp(filter[key].$regex, "i").test(college[key]);
        });
      });
    }

    return res.status(200).json({
      status: true,
      message: "Colleges retrieved successfully.",
      data: result
    });

  } catch (error) {
    console.error("Error fetching colleges:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve colleges.",
      data: false,
    });
  }
};



// Update College
const updateCollege = async (req, res) => {
  try {
    const { id } = req.params; // College ID to update
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    // Validate data types for specific fields
    if (updates.established_year && isNaN(Number(updates.established_year))) {
      return res.status(400).json({
        status: false,
        message: "Established year must be a number.",
        data: false,
      });
    }

    if (updates.ranking && isNaN(Number(updates.ranking))) {
      return res.status(400).json({
        status: false,
        message: "Ranking must be a number.",
        data: false,
      });
    }

    if (updates.location) {
      const { latitude, longitude } = updates.location;
      if (latitude && typeof latitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Latitude must be a number.",
          data: false,
        });
      }
      if (longitude && typeof longitude !== "number") {
        return res.status(400).json({
          status: false,
          message: "Longitude must be a number.",
          data: false,
        });
      }
    }

    // Find the college to update
    const existingCollege = await College.findById(id);
    if (!existingCollege) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    // Update fields
    const updatedCollege = await College.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "College updated successfully.",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: false,
        message: "Validation failed.",
        data: error.message,
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Delete College (soft delete)
const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    // Soft delete the college
    college.deleteflag = true;
    college.status = false;
    await college.save();

    return res.status(200).json({
      status: true,
      message: "College deleted successfully.",
      data: false,
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

// Get College by ID
const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "College ID is required.",
        data: false,
      });
    }

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({
        status: false,
        message: "College not found.",
        data: false,
      });
    }

    return res.status(200).json({
      status: true,
      message: "College retrieved successfully.",
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college by ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        status: false,
        message: "Invalid College ID format.",
        data: false,
      });
    }
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      data: false,
    });
  }
};

module.exports = {
  createCollege,
  updateCollege,
  deleteCollege,
  getCollegeById,
  getAllColleges,
};
