import mongoose from "mongoose";

const NeedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["food", "medical", "education", "repair", "other"],
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  urgency: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "fulfilled"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Need = mongoose.model("Need", NeedSchema);

export default Need;