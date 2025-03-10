const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const { Admin } = require("../models");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'Brandshow@123'; 

// Admin login and token generation
const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await Admin.findOne({ email, status: true });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Admin Not Found!",
        data: false,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Password Not Match!",
        data: false,
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } 
    );

    // Remove the password field before sending the response
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res.status(200).json({
      status: true,
      message: "Admin Logged In Successfully",
      data: { user: userWithoutPassword, token }, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

// Admin registration
const register = async (req, res) => {
  const { username, password, type, email, mobile, pincode, lastLogin, role } = req.body;

  console.log("Request body:", req.body);  // Log request body to check if password is being passed

  if (!password) {
    return res.status(400).json({
      status: false,
      message: "Password is required",
      data: false,
    });
  }

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Admin already exists",
        data: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      type,
      email,
      mobile,
      pincode,
      lastLogin,
      role, 
    });

    await newAdmin.save();

    res.status(201).json({
      status: true,
      message: "Admin registered successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};


// Update admin details
const updateAdmin = async (req, res) => {
  const { id } = req.params; // Admin ID
  const updates = req.body;

  try {
    // Find the admin to update
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
        data: false,
      });
    }

    // Update admin data
    const updatedAdmin = await Admin.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

// Soft delete admin (update status and deleteflag)
const deleteAdmin = async (req, res) => {
  const { id } = req.params; // Admin ID

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
        data: false,
      });
    }

    // Soft delete the admin
    admin.status = false; // Set status to false
    admin.deleteflag = true; // Set deleteflag to true

    await admin.save();

    return res.status(200).json({
      status: true,
      message: "Admin deleted successfully",
      data: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

module.exports = {
  auth,
  register,
  updateAdmin,
  deleteAdmin,
};
