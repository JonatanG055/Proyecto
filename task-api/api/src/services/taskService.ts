import TaskModel, { Task } from '../models/task';

export const getAllTasks = async (): Promise<Task[]> => {
    return TaskModel.find();
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
    return TaskModel.create(task);
};

export const updateTask = async (id: string, update: Partial<Task>): Promise<Task | null> => {
    return TaskModel.findByIdAndUpdate(id, update, { new: true });
};

export const deleteTask = async (id: string): Promise<boolean> => {
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
};

