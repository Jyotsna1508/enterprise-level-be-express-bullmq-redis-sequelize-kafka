import redis from "../../config/redis.js";
import { Task } from "./task.model.js";

export const createTask = async (data, userId) => {
  const task = await Task.create({...data,  UserId: userId});
   const keys = await redis.keys(`Task:${userId}:*`);
  if(keys.length > 0){
    await redis.del(keys);
  }
  return task;
};

export const updateTask = async (id, data, userId) => {
  const task = await Task.findOne({where: {id, UserId: userId}});
  if (!task) throw new Error("task not found");
  await task.update(data);
   const keys = await redis.keys(`Task:${userId}:*`);
  if(keys.length > 0){
    await redis.del(keys);
  };
  return task;
};

export const getByTaskId = async (id, userId) => {
    const task = await Task.findOne({where: {id, UserId: userId}});
  if (!task) throw new Error("task not found");
  return task;
};

export const deleteTask = async (id, userId) => {
  const task = await Task.findOne({where: {id, UserId: userId}});
  if (!task) throw new Error("task not found");
  await task.destroy();
   const keys = await redis.keys(`tasks:${userId}:*`);

  if (keys.length > 0) {
    await redis.del(keys);
  }

  return true;
};
