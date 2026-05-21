import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import redis from "./config/redis.js";

import "./utils/associations.js";
const port = process.env.PORT || "3000";

const startServer = async () => {
  try {
    await redis.connect();
    await connectDB();
    await sequelize.sync();
    const server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    process.on('SIGTERM', async()=> {
      console.log('shutting down');
      await sequelize.close();
      server.close(()=> process.exit(1));
    })
  } catch (error) {
    console.log("start up error", error);
    process.exit(1);
  }
};

startServer();
