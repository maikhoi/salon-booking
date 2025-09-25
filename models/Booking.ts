import mongoose, { Schema, model, models } from "mongoose";

const bookingSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service", // 👈 must match your Service model name
      required: true,
    },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    note: { type: String },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Booking || model("Booking", bookingSchema);
