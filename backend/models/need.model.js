import mongoose from "mongoose";

const NeedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes extra whitespace
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["food", "clothing", "shelter", "medical", "education", "other"],
    default: "other",
  },
  location: {
    type: String,
    required: true, // Could be a city, address, or geographic region
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User who created this need
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in progress", "fulfilled"],
    default: "open", // Tracks the lifecycle of the need
  },
  fulfilledBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Volunteers working on this need
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set when the need is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically updated
  },
});

NeedSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Need = mongoose.model("Need", NeedSchema);

export default Need;
