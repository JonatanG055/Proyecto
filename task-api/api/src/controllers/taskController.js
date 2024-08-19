"use strict";
// src/controllers/taskController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskById = exports.addTask = exports.getTasks = void 0;
const taskService_1 = require("../services/taskService");
const task_1 = require("../models/task");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, taskService_1.getAllTasks)();
        res.json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getTasks = getTasks;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
    }
    if (priority && !Object.values(task_1.Priority).includes(priority)) {
        res.status(400).json({ message: 'Invalid priority value' });
        return;
    }
    const newTask = {
        title,
        description,
        completed: false,
        priority: priority || task_1.Priority.Low,
    };
    try {
        const createdTask = yield (0, taskService_1.createTask)(newTask);
        res.status(201).json(createdTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addTask = addTask;
const updateTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;
    if (priority && !Object.values(task_1.Priority).includes(priority)) {
        res.status(400).json({ message: 'Invalid priority value' });
        return;
    }
    try {
        const updatedTask = yield (0, taskService_1.updateTask)(id, { title, description, completed, priority, updatedAt: new Date() });
        if (updatedTask) {
            res.json(updatedTask);
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateTaskById = updateTaskById;
const deleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const success = yield (0, taskService_1.deleteTask)(id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteTaskById = deleteTaskById;
