export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export interface Task {
    id: string;                // Identificador único de la tarea
    title: string;             // Título de la tarea
    description: string;       // Descripción de la tarea
    completed: boolean;        // Estado de la tarea (completada o no)
    priority?: Priority;       // Nivel de prioridad (opcional)
    createdAt?: Date;          // Fecha de creación (opcional)
    updatedAt?: Date;          // Fecha de última actualización (opcional)
}
