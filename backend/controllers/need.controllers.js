import Need from "../models/Need.js";

export const createNeed = async (req, res) => {
  const { title, description, location, category, urgencyLevel } = req.body;

  try {
    const newNeed = new Need({
      title,
      description,
      location,
      category,
      urgencyLevel,
      createdBy: req.user.id, // Assume `req.user` is populated via authentication middleware
    });

    await newNeed.save();
    res.status(201).json({ message: "Need created successfully", need: newNeed });
  } catch (error) {
    res.status(500).json({ message: "Error creating need", error: error.message });
  }
};

export const deleteNeed = async (req, res) => {
    try {
      const need = await Need.findById(req.params.id);
  
      if (!need) {
        return res.status(404).json({ message: "Need not found" });
      }
  
      // Check if the user is the owner of the need
      if (need.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this need" });
      }
  
      await need.remove();
      res.status(200).json({ message: "Need deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting need", error: error.message });
    }
  };
  
