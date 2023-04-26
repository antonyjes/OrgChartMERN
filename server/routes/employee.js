import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getEmployeesOrg } from "../controllers/employee.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getEmployeesOrg);

export default router;