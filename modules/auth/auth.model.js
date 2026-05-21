import { DataTypes, ENUM } from "sequelize";
import { sequelize } from "../../config/database.js";


export const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    }
});