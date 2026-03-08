import { Request, Response } from "express";
import {
    createTaskService,
    getTasksService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService
} from "../services/task.service";

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        const task = await createTaskService({
            ...req.body,
            user: userId
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        const tasks = await getTasksService(userId);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await getTaskByIdService(req.params.id as string);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await updateTaskService(req.params.id as string, req.body);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await deleteTaskService(req.params.id as string);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};