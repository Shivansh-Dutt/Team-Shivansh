import express from "express";
import { register ,login, updateProfile} from "../controllers/user.controller.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.put("/updateProfile",updateProfile)

export default router;
