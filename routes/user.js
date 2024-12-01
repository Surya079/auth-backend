import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getUsers from "../controllers/userController.js";

const router = express.Router();

router.get("/get-user", authMiddleware, getUsers);

export default router;
