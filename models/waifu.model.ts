import mongoose from "mongoose";

const waifuSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String },
  appearsIn: { type: String, required: true },
});

export const Waifu =
  mongoose.models.Waifus || mongoose.model("Waifus", waifuSchema);
