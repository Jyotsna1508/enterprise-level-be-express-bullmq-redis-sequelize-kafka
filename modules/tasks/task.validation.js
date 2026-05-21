import Joi from "joi";
import { TASK_STATUS } from "./task.model.js";

export const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    status: Joi.string().valid(...Object.values(TASK_STATUS)).optional()
});


export const getTaskQuerySchema = Joi.object({
    page: Joi.string().min(1).default(1),
    limit: Joi.string().min(1).max(100).default(10),
    status: Joi.string().valid(...Object.values(TASK_STATUS)).optional()
})