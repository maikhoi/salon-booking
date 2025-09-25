const mongoose = require("mongoose");
const Service = require("../models/Service");
require("dotenv").config({ path: "./.env.local" });

const services = [
  { name: "Basic Manicure", duration: 30, price: 25 },
  { name: "Deluxe Pedicure", duration: 60, price: 50 },
  { name: "Gel Nails", duration: 45, price: 40 },
  { name: "Eyebrow Waxing", duration: 20, price: 20 },
  { name: "Facial Treatment", duration: 60, price: 70 },
];

async function seed() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    console.log("🗑️ Clearing old services...");
    await Service.deleteMany({});

    console.log("➕ Inserting new services...");
    await Service.insertMany(services);

    console.log("🎉 Sample services seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding services:", err);
    process.exit(1);
  }
}

seed();
