const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

router.get('/', async (req, res) => {
    const barbers = await Barber.find();
    res.json(barbers);
});

module.exports = router;
