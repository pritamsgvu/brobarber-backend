const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// GET all barbers
router.get('/', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single barber by ID
router.get('/:id', async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.json(barber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST to add a new barber
router.post('/', async (req, res) => {
  const { name, mobile, address, aadhar, photo, isActive } = req.body;

  try {
    const barber = new Barber({ name, mobile, address, aadhar, photo, isActive });
    await barber.save();
    res.status(201).json(barber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing barber
router.put('/:id', async (req, res) => {
  const { name, mobile, address, aadhar, photo, isActive } = req.body;

  try {
    const barber = await Barber.findByIdAndUpdate(
      req.params.id,
      { name, mobile, address, aadhar, photo, isActive },
      { new: true }
    );

    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    res.json(barber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a barber by ID
router.delete('/:id', async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id);

    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    res.json({ message: 'Barber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
