const mongoose = require('mongoose');

// Define the schema for each question-answer pair
const questionAnswerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

// Define the schema with fields for each topic
const faqSchema = new mongoose.Schema({
  general: [questionAnswerSchema],
  offers: [questionAnswerSchema],
  roomTypes: [questionAnswerSchema],
  payments: [questionAnswerSchema],
  college: [questionAnswerSchema],
});

// Create the model from the schema
const Faq = mongoose.model('Faq', faqSchema);

module.exports = Faq;