const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceName: String,
  servicePrice: Number,
  description: String
});

module.exports = mongoose.model('Service', ServiceSchema);
