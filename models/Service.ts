import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Service<IService> ||
  mongoose.model<IService>("Service", ServiceSchema);
