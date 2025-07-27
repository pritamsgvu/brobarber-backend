const mongoose = require('mongoose');
require('dotenv').config();

const Barber = require('./models/Barber');
const Product = require('./models/Product');
const Service = require('./models/Service');
const Transaction = require('./models/Transaction');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Barber.deleteMany({});
  await Service.deleteMany({});
  await Product.deleteMany({});
  // await Transaction.deleteMany({});

  const barbers = [
    {
      name: "Chunnu",
      mobile: "9876543210",
      address: "Area 1",
      aadhar: "123456789012",
      photo: "",
      username: "chunnu",
      password: "chunnu123",
      role: "barber",
      isActive: "true"
    },
    {
      name: "Deepak",
      mobile: "9876543210",
      address: "Area 1",
      aadhar: "123456789012",
      photo: "",
      username: "deepak",
      password: "deepak123",
      role: "barber",
      isActive: "true"
    },
    {
      name: "Sharwan",
      mobile: "8765432109",
      address: "Area 2",
      aadhar: "234567890123",
      photo: "",
      username: "sharwan",
      password: "sharwan123",
      role: "barber",
      isActive: "true"
    },
    {
      name: "Faizan",
      mobile: "7654321098",
      address: "Area 3",
      aadhar: "345678901234",
      photo: "",
      username: "faizan",
      password: "faizan123",
      role: "barber",
      isActive: "true"
    },
    {
      name: "Rishav",
      mobile: "9988776655",
      address: "Area 4",
      aadhar: "456789012345",
      photo: "",
      username: "rishav",
      password: "rishav123",
      role: "barber",
      isActive: "true"
    },
    {
      name: "Bullu",
      mobile: "8899776655",
      address: "Manager Area",
      aadhar: "567890123456",
      photo: "",
      username: "bullu",
      password: "bullu123",
      role: "manager",
      isActive: "true"
    },
    {
      name: "brobarber",
      mobile: "9000000000",
      address: "Admin Office",
      aadhar: "678901234567",
      photo: "",
      username: "brobarber",
      password: "brobarber",
      role: "admin",
      isActive: "true"
    }
  ];
  
  await Barber.insertMany(barbers);

  const services = await Service.insertMany([
    { serviceName: "Hair Cut", servicePrice: 80, description: "Regular hair cut" },
    { serviceName: "Hair Wash", servicePrice: 100, description: "Shampoo and rinse" },
    { serviceName: "Beard", servicePrice: 60, description: "Trim or style beard" },
    { serviceName: "D-Tan", servicePrice: 300, description: "D-tan treatment" },
    { serviceName: "Facial", servicePrice: 500, description: "Full face facial" },
    { serviceName: "Cleaning", servicePrice: 250, description: "Deep cleaning pack" },
    { serviceName: "Scrub", servicePrice: 200, description: "Facial scrubbing" },
    { serviceName: "Bridal", servicePrice: 1200, description: "Bridal makeup/service" },
    { serviceName: "Color", servicePrice: 400, description: "Hair coloring" },
    { serviceName: "Face Massage", servicePrice: 150, description: "Relaxing massage" },
    { serviceName: "Hair Spa", servicePrice: 450, description: "Nourishing hair spa" },
    { serviceName: "Bleach", servicePrice: 300, description: "Face bleach" },
    { serviceName: "Hair Straight", servicePrice: 1000, description: "Straightening treatment" }
  ]);

  const serviceMap = {};
  services.forEach(s => serviceMap[s.serviceName] = s._id);

  const products = [
    { name: "Garnier Hair Color", services: ["Color"], serviceCharge: 150, productPrice: 190, perUsePrice: 48 },
    { name: "Fruit Gel Colour", services: ["Color"], serviceCharge: 250, productPrice: 800, perUsePrice: 40 },
    { name: "Loreal Color", services: ["Color", "Bridal"], serviceCharge: 500, productPrice: 400, perUsePrice: 80 },
    { name: "Streax Color", services: ["Color"], serviceCharge: 350, productPrice: 205, perUsePrice: 41 },
    { name: "Raga D-Tan", services: ["D-Tan"], serviceCharge: 500, productPrice: 1375, perUsePrice: 46 },
    { name: "O3 D Tan", services: ["D-Tan"], serviceCharge: 700, productPrice: 1550, perUsePrice: 52 },
    { name: "Ozone D Tan", services: ["D-Tan"], serviceCharge: 450, productPrice: 950, perUsePrice: 32 },
    { name: "Lilium D Tan", services: ["D-Tan"], serviceCharge: 350, productPrice: 450, perUsePrice: 15 },
    { name: "Lotus Scrub", services: ["Scrub"], serviceCharge: 250, productPrice: 795, perUsePrice: 40 },
    { name: "Lotus Scrub 2", services: ["Cleaning"], serviceCharge: 250, productPrice: 845, perUsePrice: 42 },
    { name: "Facemassga Pack", services: ["Face Massage"], serviceCharge: 350, productPrice: 1045, perUsePrice: 52 },
    { name: "Creem Facemask", services: ["Facial"], serviceCharge: 150, productPrice: 495, perUsePrice: 25 },
    { name: "Lorial Spa", services: ["Hair Spa"], serviceCharge: 600, productPrice: 800, perUsePrice: 80 },
    { name: "Lorial-Mfule-Spa", services: ["Hair Spa"], serviceCharge: 900, productPrice: 900, perUsePrice: 100 },
    { name: "Lilium Massage", services: ["Face Massage"], serviceCharge: 200, productPrice: 320, perUsePrice: 11 },
    { name: "Lilium Scrub", services: ["Scrub"], serviceCharge: 200, productPrice: 300, perUsePrice: 10 },
    { name: "Sehnaz Massage", services: ["Face Massage"], serviceCharge: 500, productPrice: 1195, perUsePrice: 40 },
    { name: "Emy Masaage", services: ["Face Massage"], serviceCharge: 200, productPrice: 225, perUsePrice: 8 },
    { name: "Oxy Bleach", services: ["Bleach"], serviceCharge: 250, productPrice: 300, perUsePrice: 43 },
    { name: "Raga Facial", services: ["Facial"], serviceCharge: 1500, productPrice: 400, perUsePrice: 400 },
    { name: "O3 8 Step Facial", services: ["Facial"], serviceCharge: 3000, productPrice: 885, perUsePrice: 885 },
    { name: "O3 10 Step Facial", services: ["Facial", "Bridal"], serviceCharge: 3000, productPrice: 699, perUsePrice: 699 },
    { name: "Natures Facial", services: ["Facial"], serviceCharge: 1500, productPrice: 2100, perUsePrice: 525 },
    { name: "Sehnaz Facial", services: ["Facial"], serviceCharge: 1700, productPrice: 1190, perUsePrice: 595 },
    { name: "Lotus Facial", services: ["Facial"], serviceCharge: 2000, productPrice: 1400, perUsePrice: 700 },
    { name: "Strex Hair Straight", services: ["Hair Straight"], serviceCharge: 1500, productPrice: 1400, perUsePrice: 280 },
    { name: "Lorial Hair Straight", services: ["Hair Straight"], serviceCharge: 2000, productPrice: 1520, perUsePrice: 304 },
    { name: "Lorial Shampoo", services: ["Hair Wash"], serviceCharge: 100, productPrice: 790, perUsePrice: 20 },
    { name: "H&S Shampoo", services: ["Hair Wash"], serviceCharge: 50, productPrice: 150, perUsePrice: 5 },
    { name: "None", services: [], serviceCharge: 0, productPrice: 0, perUsePrice: 0 },
    { name: "Other", services: [], serviceCharge: 0, productPrice: 0, perUsePrice: 0 },
    { name: "Hair Cut", services: ["Hair Cut"], serviceCharge: 150, productPrice: 0, perUsePrice: 0 },
    { name: "Beard", services: ["Beard"], serviceCharge: 50, productPrice: 150, perUsePrice: 5 },   
  ];
  

  await Product.insertMany(products.map(p => ({
    productName: p.name,
    brand: p.name.split(" ")[0],
    productPrice: p.productPrice,
    perUsePrice: p.perUsePrice,
    serviceCharge: p.serviceCharge,
    services: p.services.map(s => serviceMap[s])
  })));

  console.log("✅ Manual seed completed with prices for all services and products.");
  process.exit();
}).catch(err => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
