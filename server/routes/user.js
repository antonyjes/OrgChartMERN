import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteUser, getUser, getUsers } from "../controllers/user.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getUsers);
router.get("/:userId/user", verifyToken, getUser);

// DELETE
router.delete("/:userId/delete", verifyToken, deleteUser);

export default router;