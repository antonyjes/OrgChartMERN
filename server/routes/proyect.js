import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createProyect, deleteProyect, editProyect, getProyects } from "../controllers/proyect.js";

const router = express.Router()

// READ
router.get("/", verifyToken, getProyects);

// CREATE
router.post("/createProyect", verifyToken, createProyect);

// UPDATE
router.patch("/:proyectId/editProyect", verifyToken, editProyect);

// DELETE
router.delete("/:proyectId/delete", verifyToken, deleteProyect);

export default router;