// src/models/task.ts

import mongoose, { Document, Schema } from 'mongoose';

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Task extends Document {
    title: string;
    description: string;
    completed: boolean;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: Object.values(Priority), default: Priority.Low },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
