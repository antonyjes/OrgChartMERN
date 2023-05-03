import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createProyect, getProyects } from "../controllers/proyect.js";

const router = express.Router()

// READ
router.get("/", verifyToken, getProyects);

// CREATE
router.post("/createProyect", verifyToken, createProyect);

export default router;