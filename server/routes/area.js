import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createArea, editArea, getAreas } from "../controllers/area.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getAreas);

// CREATE
router.post("/createArea", verifyToken, createArea);

// UPDATE
router.patch("/:areaId/editArea", verifyToken, editArea);

export default router;
