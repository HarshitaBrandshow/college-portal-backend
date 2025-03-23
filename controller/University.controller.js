const  { University } = require('../models'); 

// CREATE: Add a new university
const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json({ message: 'University created successfully', data: university });
  } catch (error) {
    res.status(400).json({ message: 'Error creating university', error: error.message });
  }
};

// READ: Get all universities
const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json({ message: 'Universities fetched successfully', data: universities });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching universities', error: error.message });
  }
};

// READ: Get a single university by ID
const getUniversityById = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University fetched successfully', data: university });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching university', error: error.message });
  }
};

// UPDATE: Update university details by ID
const updateUniversity = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUniversity = await University.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUniversity) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University updated successfully', data: updatedUniversity });
  } catch (error) {
    res.status(400).json({ message: 'Error updating university', error: error.message });
  }
};

// DELETE: Soft delete university by ID (using 'deletedAt' field)
const deleteUniversity = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.status(200).json({ message: 'University deleted successfully', data: university });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting university', error: error.message });
  }
};


module.exports = {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity
};
