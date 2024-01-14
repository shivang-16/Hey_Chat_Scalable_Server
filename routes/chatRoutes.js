import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { get_Chat_By_Sender_N_Receover, saveChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/save", isAuthenticated, saveChat);
router.post("/get", isAuthenticated, get_Chat_By_Sender_N_Receover)

export default router;
