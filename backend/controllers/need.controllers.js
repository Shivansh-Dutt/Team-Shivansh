import Need from "../models/need.model.js";
import User from "../models/user.model.js"

// Create a new need
export const createNeed = async (req, res) => {
  const { title, description, location, category, urgency } = req.body;

  try {
    if (!title || !description || !location || !category || !urgency) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create and save the new need
    const newNeed = await Need.create({
      title,
      description,
      location,
      category,
      urgency,
      reportedBy: req.id, // Using req.id from authentication middleware
    });

    // Populate the `reportedBy` field for response
    const populatedNeed = await Need.findById(newNeed._id).populate(
      "reportedBy",
      "name email"
    );

    res.status(201).json({
      message: "Need created successfully",
      need: populatedNeed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating need",
      error: error.message,
    });
  }
};

// Get all needs with optional filtering by category and urgency
export const getAllNeeds = async (req, res) => {
  const { category, urgency } = req.query; // Use query parameters for filtering

  try {
    const query = {};
    if (category) query.category = category;
    if (urgency) query.urgency = urgency;

    const needs = await Need.find(query).populate("reportedBy", "name email");

    res.status(200).json({
      message: "Needs fetched successfully",
      needs,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching needs", error: error.message });
  }
};

// Get detailed information about a single need by ID
export const getNeedById = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id).populate(
      "reportedBy",
      "name email"
    );

    if (!need) {
      return res.status(404).json({ message: "Need not found" });
    }

    res.status(200).json(need);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching need", error: error.message });
  }
};

// Update a need
export const updateNeed = async (req, res) => {
  const { title,description, location, urgency } = req.body;

  try {
    let needID = req.params.id

    const need = await Need.findById(needID).populate(
      "reportedBy",
      "name email"
    );

    if (!need) {
      return res.status(404).json({ message: "Need not found" });
    }

    need.title = title || need.title;
    need.description = description || need.description;
    need.location = location || need.location;
    need.urgency = urgency || need.urgency;

    await need.save();
    res.status(200).json({ message: "Need updated successfully", need });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Need", error: error.message });
  }
};

// fullfiled need

export const fulfillNeed = async (req, res) => {
  try {
    const { id } = req.params; // Need ID
    const userId = req.id; // User ID from authentication middleware

    // Fetch the user to check their role
    const user = await User.findById(userId);

    if (!user || user.role !== "volunteer") {
      return res.status(403).json({
        message: "Only volunteers can fulfill needs",
      });
    }

    // Fetch the need by ID
    const need = await Need.findById(id);
    
    if (!need) {
      return res.status(404).json({ message: "Need not found" });
    }

    // Check if the need is already fulfilled
    if (need.status === "fulfilled") {
      return res.status(400).json({ message: "This need has already been fulfilled" });
    }

    // Add the userId to the fulfilledBy array
    need.fulfilledBy.push(userId);  // Correct method to push into an array
    need.status = "fulfilled";

    await need.save();

    // // Optionally populate the `fulfilledBy` field with volunteer details
    const populatedNeed = await Need.findById(id)
      .populate("reportedBy", "name email")
      .populate("fulfilledBy", "name email");

    res.status(200).json({
      message: "Need fulfilled successfully",
      need: populatedNeed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fulfilling the need",
      error: error.message,
    });
  }
};

// Delete a need
export const deleteNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id);

    if (!need) {
      return res.status(404).json({ message: "Need not found" });
    }

    // Check if the user is the owner of the need
    if (need.reportedBy.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this need" });
    }

    await need.deleteOne();
    res.status(200).json({ message: "Need deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting need", error: error.message });
  }
};
