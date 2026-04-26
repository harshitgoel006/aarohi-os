import express from "express";
import { chatWithAarohi } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", chatWithAarohi);

export default router;