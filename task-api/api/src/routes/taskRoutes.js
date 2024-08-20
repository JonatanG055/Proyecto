"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gestionar tareas.
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la tarea
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 */
router.get('/', taskController_1.getTasks);
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Agregar una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: Prioridad de la tarea
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la tarea creada
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea
 *                 priority:
 *                   type: string
 *                   description: Prioridad de la tarea
 */
router.post('/', taskController_1.addTask);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: Prioridad de la tarea
 *               completed:
 *                 type: boolean
 *                 description: Estado de la tarea
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la tarea actualizada
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea
 *                 priority:
 *                   type: string
 *                   description: Prioridad de la tarea
 *                 completed:
 *                   type: boolean
 *                   description: Estado de la tarea
 */
router.put('/:id', taskController_1.updateTaskById);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea existente por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tarea eliminada
 */
router.delete('/:id', taskController_1.deleteTaskById);
exports.default = router;
