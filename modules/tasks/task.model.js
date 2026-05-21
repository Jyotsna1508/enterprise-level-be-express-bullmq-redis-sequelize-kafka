import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};
export const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
      defaultValue: TASK_STATUS.PENDING,
    },
  },
  {
    indexes: [
      { fields: ["UserId"] },
      { fields: ["id"] },
      {
        fields: ["UserId", "id"],
      }
    ],
  },
);
