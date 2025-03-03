const express = require('express');
const router = express.Router();
const  { FaqController } = require('../controller'); // Import the controller

// Route to create a new FAQ
router.post('/create', FaqController.createFaq);

// Route to get all FAQs
router.get('/faqs', FaqController.getAllFaqs);

// Route to get a specific FAQ by ID
router.get('/:id', FaqController.getFaqById);

// Route to update an existing FAQ by ID
router.put('/:id', FaqController.updateFaq);

// Route to delete an FAQ by ID
router.delete('/:id', FaqController.deleteFaq);

module.exports = router;
