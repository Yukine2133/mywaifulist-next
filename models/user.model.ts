import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  given_name: String,
  picture: String,
  email: String,
  id: String,
});

export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
