import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createProyect, editProyect, getProyects } from "../controllers/proyect.js";

const router = express.Router()

// READ
router.get("/", verifyToken, getProyects);

// CREATE
router.post("/createProyect", verifyToken, createProyect);

// UPDATE
router.patch("/:proyectId/editProyect", verifyToken, editProyect);

export default router;