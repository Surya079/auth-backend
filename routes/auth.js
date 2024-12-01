import { Register, Login, verify } from "../controllers/authControllers.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/verify", authMiddleware, verify);

export default router;
