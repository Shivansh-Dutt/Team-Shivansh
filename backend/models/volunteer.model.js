import mongoose from "mongoose";

const VolunteerTaskSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  needId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Need",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    required: false,
  },
});

const VolunteerTask = mongoose.model("VolunteerTask", VolunteerTaskSchema)

export default VolunteerTask;