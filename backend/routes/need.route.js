import express from "express";
import { createNeed, getAllNeeds, getNeedById, updateNeed ,fulfillNeed, deleteNeed} from "../controllers/need.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create a new need
router.post("/needs", isAuthenticated, createNeed);

// Get all needs (filtered)
router.get("/needs", isAuthenticated, getAllNeeds);

// Get a need by ID
router.get("/needs/:id", isAuthenticated, getNeedById);

// update a need by ID
router.post("/needs/:id",isAuthenticated,updateNeed)


// Fulfill a need
router.patch("/needs/:id/fulfill", isAuthenticated, fulfillNeed);

// Delete a need

router.delete("/:id/delete",isAuthenticated,deleteNeed)

export default router;
