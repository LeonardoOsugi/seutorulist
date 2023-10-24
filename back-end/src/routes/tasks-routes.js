import {Router} from 'express';
import { createTask, findTasks, findTasksForTitle } from '../controllers/tasks-controllers.js';
import { taskSchemaValidation } from '../middlewares/task-schema-validation-middleware.js';
import { authRoutesValidation } from '../middlewares/auth-validation-middleware.js';

const tasksRouter = Router();

tasksRouter
.post("/tasks", authRoutesValidation,taskSchemaValidation,createTask)
.get("/tasks", authRoutesValidation,findTasks)
.post("/tasks-for-title", authRoutesValidation, findTasksForTitle)



export default tasksRouter;