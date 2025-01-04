import express from "express";
import { register ,login, updateProfile, getProfile} from "../controllers/user.controller.js";
import isAuthentiacted from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/:id/getProfile",isAuthentiacted,getProfile)
router.post("/profile/update",isAuthentiacted,updateProfile)

export default router;
