import express from "express";
import { createNeed, getAllNeeds } from "../controllers/need.controllers.js";
import isAuthentiacted from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.post("/createNeed",isAuthentiacted,createNeed)
router.post("/getallNeeds",isAuthentiacted,getAllNeeds)

export default router