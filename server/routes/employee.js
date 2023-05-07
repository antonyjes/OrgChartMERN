import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteEmployee, getEmployeesOrg } from "../controllers/employee.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getEmployeesOrg);

// DELETE
router.delete("/:employeeId/delete", verifyToken, deleteEmployee);

export default router;