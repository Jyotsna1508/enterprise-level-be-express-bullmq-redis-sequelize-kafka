import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  deviceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  refreshTokenHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  expiresAt: {
    type: DataTypes.DATE,
  },
});
