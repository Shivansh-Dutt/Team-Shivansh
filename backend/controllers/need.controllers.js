import Need from "../models/need.model.js";

export const createNeed = async (req, res) => {
  const { title, description, location, category, urgency } = req.body;

  try {
    if(!title || !description || !location || !category || !urgency){
        return res.status(409).json({message:"Enter all data"})
    }

    // Create a new need
    const newNeed = new Need({
      title,
      description,
      location,
      category,
      urgency,
      // Assume `req.user` is populated via authentication middleware
      reportedBy : req.id,
    });

    await newNeed.save();

    // Populate createdBy field with user details
    const populatedNeed = await Need.findById(newNeed._id).populate(
      "reportedBy",
      "name email"
    );

    res.status(201).json({
      message: "Need created successfully",
      need: populatedNeed,
    });
  } catch (error) {
      console.log(error)
    res.status(500).json({
      message: "Error creating need",
      error: error.message,
    });
  }
};

// can create new need

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
  
// give all needs filtered by category

  export const getAllNeeds = async (req, res) => {
    const { category, urgency } = req.body;
  
    try {
        if(!category && !urgency){
            return res.status(201).json({message:"Invalid Information"})
        }

        console.log(urgency)
      const query = {};
  
      if (category) query.category = category;
      if (urgency) query.urgency = urgency;
  
      console.log(query)
      const needs = await Need.find(query)
        .populate("reportedBy", "name email") // Populate creator's name and email
        // .populate("fulfilledBy", "name email"); // Populate volunteer's name and email
  
      res.status(200).json(needs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching needs", error: error.message });
    }
  };
  
//   get a detail informaton of single need user

  export const getNeedById = async (req, res) => {
    try {
      const need = await Need.findById(req.params.id)
        .populate("createdBy", "name email")
        // .populate("fulfilledBy", "name email");
  
      if (!need) {
        return res.status(404).json({ message: "Need not found" });
      }
  
      res.status(200).json(need);
    } catch (error) {
      res.status(500).json({ message: "Error fetching need", error: error.message });
    }
  };
  