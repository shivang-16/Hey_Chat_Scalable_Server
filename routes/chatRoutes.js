import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { saveChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/save", isAuthenticated, saveChat);

export default router;
