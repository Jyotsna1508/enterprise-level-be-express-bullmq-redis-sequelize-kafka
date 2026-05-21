import { User } from "../modules/auth/auth.model.js";
import { Task } from "../modules/tasks/task.model.js";

User.hasMany(Task);
Task.belongsTo(User);