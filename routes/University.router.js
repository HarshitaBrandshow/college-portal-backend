const express = require('express');
const router = express.Router();
const { UniversityController } = require('../controller');

// Create a new university
router.post('/create', UniversityController.createUniversity);

// Get all universities
router.get('/universities', UniversityController.getAllUniversities);

// Get a specific university by ID
router.get('/:id', UniversityController.getUniversityById);

// Update a university by ID
router.put('/:id', UniversityController.updateUniversity);

// Soft delete a university by ID
router.delete('/:id', UniversityController.deleteUniversity);

module.exports = router;
