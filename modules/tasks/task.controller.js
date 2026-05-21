import { asyncHandler } from '../../middleware/async-handler.middleware.js';
import { logger } from '../../utils/logger.js';
import * as service from './task.service.js';
export const getTask = asyncHandler(async(req, res) => {
    logger.info('GET /task called', {query: req.query});
    const {
    page = 1,
    limit = 10,
    status,
  } = req.query;
    const data = await service.getTask(page, limit, status, req.user.id);
    logger.info('GET /task successful', {count: data.data.length});
    res.json(data);
});

export const createTask = asyncHandler(async(req, res) => {
    logger.info('POST /task called', { query: req.query});

    const data = await service.createTask(
      req.body,
      req.user.id
    );
    res.status(201).json(data);
});
export const updateTask = asyncHandler(async(req, res) => {
    const data = await service.updateTask(req.params.id, req.body, req.user.id);
    res.json(data);
});

export const deleteTask = asyncHandler(async(req, res) => {
    const data = await service.deleteTask(req.params.id, req.user.id);
    res.json(data);
});

export const getByTaskId = asyncHandler(async(req, res) => {
    const data = await service.getTask(req.params.id, req.user.id);
    res.json(data);
});