import express from "express"
import { deleteVolunteer, getAllVolunteers, getVolunteerById, registerVolunteer, updateVolunteer } from "../controllers/volunteer.controller"
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.get("/getAllVolunteer",getAllVolunteers)
router.post("/register",registerVolunteer)
router.get("/getVolunteerById",getVolunteerById)
router.post("/updateVolunteer",isAuthenticated,updateVolunteer)
router.delete("/deleteVolunteer",isAuthenticated,deleteVolunteer)

export default router;