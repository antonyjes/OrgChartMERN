import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAreas } from "../controllers/area.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getAreas);

export default router;
