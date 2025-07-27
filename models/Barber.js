const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: false },
  aadhar: { type: String, required: false },
  photo: { type: String, required: false },
  isActive: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model('Barber', BarberSchema);
