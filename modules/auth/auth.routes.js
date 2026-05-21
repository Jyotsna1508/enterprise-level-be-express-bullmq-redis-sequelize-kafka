import express from "express";
import { login, logout, refreshToken, register } from "./auth.controller.js";
import { auth } from "../../middleware/authenticate.middleware.js";
import { loginLimiter } from "../../middleware/rate-limiter-middleware.js";

const authRouter = express.Router();
authRouter.get('/login', loginLimiter ,login);
authRouter.post('/register', register);
authRouter.post('/refresh-token', refreshToken);
authRouter.get('/logout', auth, logout);


export default authRouter;