const express = require('express');
const router = express.Router();
const  { PropertyController } = require('../controller');

// Create a new property
router.post('/create', PropertyController.createProperty);

// Get all properties
router.get('/properties', PropertyController.getAllProperties);

// Get property by ID
router.get('/:id', PropertyController.getPropertyById);

// Update a property by ID
router.put('/:id', PropertyController.updateProperty);

// Delete a property by ID
router.delete('/:id', PropertyController.deleteProperty);

module.exports = router;
