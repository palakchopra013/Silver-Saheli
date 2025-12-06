import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
  price: Number
});

export default mongoose.model("Trip", tripSchema);
