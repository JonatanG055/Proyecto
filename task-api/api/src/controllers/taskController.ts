// src/controllers/taskController.ts

import { Request, Response } from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../services/taskService';
import { Priority, Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

interface NewTask {
    title: string;
    description: string;
    priority: Priority;
    completed?: boolean;
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
    }

    if (priority && !Object.values(Priority).includes(priority)) {
        res.status(400).json({ message: 'Invalid priority value' });
        return;
    }

    const newTask: NewTask = {
        title,
        description,
        completed: false,
        priority: priority || Priority.Low,
    };

    try {
        const createdTask = await createTask(newTask);
        res.status(201).json(createdTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;

    if (priority && !Object.values(Priority).includes(priority)) {
        res.status(400).json({ message: 'Invalid priority value' });
        return;
    }

    try {
        const updatedTask = await updateTask(id, { title, description, completed, priority, updatedAt: new Date() });
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTaskById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const success = await deleteTask(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
