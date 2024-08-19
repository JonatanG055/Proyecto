import { Task } from '../models/task';

let tasks: Task[] = [];

export const getAllTasks = async (): Promise<Task[]> => {
    return tasks;
};

export const createTask = async (task: Task): Promise<Task> => {
    tasks.push(task);
    return task;
};

export const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<Task | null> => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask, updatedAt: new Date() };
        return tasks[taskIndex];
    }
    return null;
};

export const deleteTask = async (id: string): Promise<boolean> => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return true;
    }
    return false;
};
