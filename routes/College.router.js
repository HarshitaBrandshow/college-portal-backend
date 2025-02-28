const express = require('express');
const router = express.Router();
const  { CollegeController } = require('../controller');

// Route to add a new college
router.post('/add-college', CollegeController.addCollege);

// Route to update a college
router.put('/update-college/:id', CollegeController.updateCollege);

// Route to fetch all colleges
router.get('/colleges', CollegeController.getAllColleges);

// Route to fetch all popular colleges
router.get('/popular-colleges', CollegeController.getAllPopularColleges);

// Route to delete a college
router.delete('/delete-college/:id', CollegeController.deleteCollege);

// Route to delete a popular college
router.delete('/delete-popular-college/:id', CollegeController.deletePopularCollege);

module.exports = router;
