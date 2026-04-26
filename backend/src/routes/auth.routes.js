import express from "express";
import { setup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/setup", setup);
router.post("/login", login);

export default router;