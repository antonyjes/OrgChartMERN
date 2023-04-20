import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createArea, deleteArea, editArea, getAreas } from "../controllers/area.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getAreas);

// CREATE
router.post("/createArea", verifyToken, createArea);

// UPDATE
router.patch("/:areaId/editArea", verifyToken, editArea);

// DELETE
router.delete("/:areaId/delete", verifyToken, deleteArea);

export default router;
