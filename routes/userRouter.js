import express from "express";
import {
  login,
  logout,
  register,
  resendOtp,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/resend", resendOtp);
router.post("/login", login);
router.get("/logout", logout);

export default router;
