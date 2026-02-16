import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

// Create a new router
const router = express.Router();

// Register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;