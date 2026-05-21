import express  from "express";
import { createTask, deleteTask, getByTaskId, getTask, updateTask } from "./task.controller.js";
import { validate } from "../../middleware/validate.js";
import { getTaskQuerySchema, taskSchema } from "./task.validation.js";
import { role } from "../../middleware/authorize.middleware.js";

const taskRouter = express.Router();

taskRouter.get('/', validate(getTaskQuerySchema, 'query') , getTask);
taskRouter.post('/',validate(taskSchema, 'body'), createTask);
taskRouter.get('/:id', getByTaskId);
taskRouter.put('/:id', validate(taskSchema, 'body'),updateTask);
taskRouter.delete('/:id', role("admin"),deleteTask);

export default taskRouter;