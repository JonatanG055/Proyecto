import mongoose, { Schema, Document } from 'mongoose';

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export interface Task extends Document {
    title: string;
    description: string;
    completed: boolean;
    priority?: Priority;
    createdAt?: Date;
    updatedAt?: Date;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: Object.values(Priority), default: Priority.Low },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model<Task>('Task', TaskSchema);

export default TaskModel;
