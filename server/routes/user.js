import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUsers } from "../controllers/user.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getUsers);

export default router;