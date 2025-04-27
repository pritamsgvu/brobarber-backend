const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new service
router.post('/', async (req, res) => {
  try {
    const { serviceName, servicePrice, description } = req.body;
    const newService = new Service({ serviceName, servicePrice, description });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a service
router.put('/:id', async (req, res) => {
  try {
    const { serviceName, servicePrice, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { serviceName, servicePrice, description },
      { new: true } // returns updated document
    );
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service
router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
