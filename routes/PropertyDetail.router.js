const express = require('express');
const router = express.Router();
const  { PropertyDetailController } = require('../controller');

// Routes for CRUD operations
router.post('/create', PropertyDetailController.createPropertyDetail); // Create
router.get('/property-details', PropertyDetailController.getAllPropertyDetails); // Read all
router.get('/:id', PropertyDetailController.getPropertyDetailById); // Read by ID
router.put('/:id', PropertyDetailController.updatePropertyDetail); // Update
router.delete('/:id', PropertyDetailController.deletePropertyDetail); // Delete

module.exports = router;
