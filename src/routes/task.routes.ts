import express from "express";
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask
} from "../controllers/task.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/tasks", authenticateUser, createTask);
router.get("/tasks", authenticateUser, getTasks);
router.get("/tasks/:id", authenticateUser, getTaskById);
router.put("/tasks/:id", authenticateUser, updateTask);
router.delete("/tasks/:id", authenticateUser, deleteTask);

export default router;