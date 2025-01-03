import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["volunteer", "user"],
    default: "user",
  },
  skills: {
    type: [String],
    default: [], // Relevant for volunteers
  },
  location: {
    type: String, // Could be a city name, or use coordinates for precise mapping
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
