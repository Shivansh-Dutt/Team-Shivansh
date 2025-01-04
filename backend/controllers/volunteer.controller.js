import User from "../models/User.js";

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "volunteer" }).select(
      "name email skills location"
    ); // Fetch only relevant fields

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching volunteers",
      error: error.message,
    });
  }
};

// Add a new volunteer
export const registerVolunteer = async (req, res) => {
  const { name, email, password, skills, location } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new volunteer
    const newVolunteer = new User({
      name,
      email,
      password, // Assume hashing is handled in the User model or a pre-save hook
      role: "volunteer",
      skills,
      location,
    });

    await newVolunteer.save();

    res.status(201).json({
      success: true,
      message: "Volunteer registered successfully",
      data: {
        id: newVolunteer._id,
        name: newVolunteer.name,
        email: newVolunteer.email,
        skills: newVolunteer.skills,
        location: newVolunteer.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering volunteer",
      error: error.message,
    });
  }
};

// Get volunteer by ID
export const getVolunteerById = async (req, res) => {
  const { id } = req.params;

  try {
    const volunteer = await User.findById(id).where({ role: "volunteer" });

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching volunteer",
      error: error.message,
    });
  }
};

// Update volunteer details
export const updateVolunteer = async (req, res) => {
  const { id } = req.params;
  const { name, email, skills, location } = req.body;

  try {
    const updatedVolunteer = await User.findByIdAndUpdate(
      id,
      { name, email, skills, location },
      { new: true, runValidators: true }
    ).where({ role: "volunteer" });

    if (!updatedVolunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found or not a volunteer",
      });
    }

    res.status(200).json({
      success: true,
      message: "Volunteer details updated",
      data: updatedVolunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating volunteer",
      error: error.message,
    });
  }
};

// Delete volunteer
export const deleteVolunteer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVolunteer = await User.findByIdAndDelete(id).where({
      role: "volunteer",
    });

    if (!deletedVolunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found or not a volunteer",
      });
    }

    res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting volunteer",
      error: error.message,
    });
  }
};
