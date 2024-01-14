import express from "express";
import {
  getAllUser,
  getMyProfile,
  login,
  logout,
  register,
  resendOtp,
  verifyOtp,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/resend", resendOtp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/all", getAllUser);

export default router;
