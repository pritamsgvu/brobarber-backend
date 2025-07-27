const express = require('express');
const bcrypt = require('bcrypt');
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
  const { name, mobile, address, aadhar, photo, isActive, username, password, role } = req.body;

  try {
   // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    const barber = new Barber({
      name,
      mobile,
      address,
      aadhar,
      photo,
      isActive,
      username,
      password: hashedPassword,  // Save hashed password
      role
    });
    
    await barber.save();
    res.status(201).json(barber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update an existing barber
router.put('/:id', async (req, res) => {
  const { name, mobile, address, aadhar, photo, isActive, username, password, role } = req.body;

  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    // Update fields
    barber.name = name ?? barber.name;
    barber.mobile = mobile ?? barber.mobile;
    barber.address = address ?? barber.address;
    barber.aadhar = aadhar ?? barber.aadhar;
    barber.photo = photo ?? barber.photo;
    barber.isActive = isActive ?? barber.isActive;
    barber.username = username ?? barber.username;
    barber.role = role ?? barber.role;

    // If password is provided and changed, hash it
    if (password && password !== '') {
      const isSame = await bcrypt.compare(password, barber.password);
      if (!isSame) {
        barber.password = await bcrypt.hash(password, 10);
      }
    }

    await barber.save();
    res.json({ message: 'Barber updated successfully', barber });
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

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const barber = await Barber.findOne({ username });

    if (!barber) {
      return res.status(404).json({ message: 'Invalid username' });
    }

    const isPasswordValid = await bcrypt.compare(password, barber.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Optional: create a token here (e.g., JWT) for session
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: barber._id,
        name: barber.name,
        username: barber.username,
        role: barber.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
