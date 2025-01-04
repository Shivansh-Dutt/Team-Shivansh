import express from "express";
import { register ,login, updateProfile, getProfile, changePassword, logout, deleteUser} from "../controllers/user.controller.js";
import isAuthentiacted from "../middlewares/isAuthenticated.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.get("/delete",deleteUser)
router.get("/:id/getProfile",isAuthentiacted,getProfile)
router.post("/profile/update",isAuthentiacted,updateProfile)
router.post("/changePassword",isAuthentiacted,changePassword)

export default router;
