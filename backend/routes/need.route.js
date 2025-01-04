import express from "express";
import { createNeed } from "../controllers/need.controllers.js";

const router = express.Router()

router.post("/createNeed",createNeed)

export default router