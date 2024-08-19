import TaskModel, { Task } from '../models/task';

export const getAllTasks = async () => {
    return await TaskModel.find();
};

export const createTask = async (task: Partial<Task>) => {
    const newTask = new TaskModel(task);
    return await newTask.save();
};

export const updateTask = async (id: string, taskUpdates: Partial<Task>) => {
    return await TaskModel.findByIdAndUpdate(id, taskUpdates, { new: true });
};

export const deleteTask = async (id: string) => {
    const result = await TaskModel.findByIdAndDelete(id);
    return result != null;
};
