const mongoose = require('mongoose');
require('dotenv').config();
const Barber = require('./models/Barber');
const Service = require('./models/Service');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    await Barber.deleteMany();
    await Service.deleteMany();
    await Product.deleteMany();

    await Barber.insertMany([
        { name: "Ravi", mobile: "9876543210", address: "Area 1", aadhar: "123456789012", photo: "" },
        { name: "Amit", mobile: "8765432109", address: "Area 2", aadhar: "234567890123", photo: "" }
    ]);

    await Product.insertMany([
        { productName: "Gel", brand: "BrandA", productPrice: 150, perUsePrice: 10 },
        { productName: "Shampoo", brand: "BrandB", productPrice: 200, perUsePrice: 15 }
    ]);

    await Service.insertMany([
        { serviceName: "Hair Cut", servicePrice: 100, productName: "Gel", productPerUsePrice: 10, description: "Basic hair cut" },
        { serviceName: "Hair Wash", servicePrice: 150, productName: "Shampoo", productPerUsePrice: 15, description: "" }
    ]);

    console.log("Dummy data inserted.");
    process.exit();
}).catch(err => console.error(err));
