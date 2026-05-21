import express from 'express';
import pinoHttp from "pino-http";
import { logger } from "./utils/logger.js";
import cookieParser from 'cookie-parser';
import healthRouter from './modules/health/health.route.js';
import { errorHandler } from './middleware/error.middleware.js';
import taskRouter from './modules/tasks/task.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import { auth } from './middleware/authenticate.middleware.js';
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(xss());
app.use(hpp());
app.use(
  pinoHttp({
    logger
  })
);
app.use('/api/', authRouter);
app.use("/health", healthRouter);

app.use(auth);
app.use('/api/task', taskRouter);
app.use(errorHandler);

export default app;