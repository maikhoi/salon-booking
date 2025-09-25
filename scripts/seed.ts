import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

const services = [
  { name: "Basic Manicure", duration: 30, price: 25 },
  { name: "Deluxe Pedicure", duration: 60, price: 50 },
  { name: "Gel Nails", duration: 45, price: 40 },
  { name: "Eyebrow Waxing", duration: 20, price: 20 },
  { name: "Facial Treatment", duration: 60, price: 70 },
];

async function seed() {
  try {
    await dbConnect();
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log("✅ Sample services seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding services:", err);
    process.exit(1);
  }
}

seed();
