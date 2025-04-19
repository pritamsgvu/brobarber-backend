const mongoose = require('mongoose');
const BarberSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    address: String,
    aadhar: String,
    photo: String
});
module.exports = mongoose.model('Barber', BarberSchema);
