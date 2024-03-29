import mongoose from "mongoose";

const waifuSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  image: { type: String, required: true },
  desc: { type: String },
  appearsIn: { type: String, required: true },
  likes: [{ type: String }],
  comments: [{ user: String, content: String, timestamp: Date }],
});

export const Waifu =
  mongoose.models.Waifus || mongoose.model("Waifus", waifuSchema);
