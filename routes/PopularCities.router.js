const express = require('express');
const router = express.Router();
const  { PopularCityController } = require('../controller');

// CRUD Routes for Popular Cities
router.post('/create', PopularCityController.createCity);
router.get('/cities', PopularCityController.getAllCities); 
router.get('/:name', PopularCityController.getCityByName); 
router.put('/:id', PopularCityController.updateCity); 
router.delete('/:id', PopularCityController.deleteCity); 

module.exports = router;
