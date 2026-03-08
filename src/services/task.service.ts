import Task from "../models/task.model";
import { CreateTaskInput } from "../types/task.types";

export const createTaskService = async (data: CreateTaskInput) => {
    const task = new Task(data);
    return await task.save();
};

export const getTasksService = async (userId: string) => {
    return await Task.find({ user: userId });
};

export const getTaskByIdService = async (id: string) => {
    return await Task.findById(id);
};

export const updateTaskService = async (id: string, data: any) => {
    return await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteTaskService = async (id: string) => {
    return await Task.findByIdAndDelete(id);
};