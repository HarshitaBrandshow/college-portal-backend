const { Faq } = require('../models'); 

// Create a new FAQ
const createFaq = async (req, res) => {
  try {
    const newFaq = new Faq(req.body); // Assume req.body contains the data for the FAQ
    await newFaq.save();
    res.status(201).json({ message: 'FAQ created successfully!', data: newFaq });
  } catch (err) {
    res.status(500).json({ message: 'Error creating FAQ', error: err });
  }
};

// Get all FAQs
const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json({ message: 'FAQs fetched successfully', data: faqs });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQs', error: err });
  }
};

// Get a specific FAQ by ID
const getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ fetched successfully', data: faq });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FAQ', error: err });
  }
};

// Update an existing FAQ by ID
const updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ updated successfully', data: updatedFaq });
  } catch (err) {
    res.status(500).json({ message: 'Error updating FAQ', error: err });
  }
};

// Delete an FAQ by ID
const deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting FAQ', error: err });
  }
};

module.exports = {
    createFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
    };
