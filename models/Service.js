const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
