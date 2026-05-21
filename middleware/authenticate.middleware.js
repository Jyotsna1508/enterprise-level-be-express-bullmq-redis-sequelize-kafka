import jwt from 'jsonwebtoken';
import redis from "../config/redis.js";
import { Session } from '../modules/auth/session.model.js';
export async function auth(req, res, next) {
  try {
    const token = req.cookies.accessToken;
    console.log(token)
    if (!token) {
        console.log('hhhh')
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN
    );
    const keys = await redis.keys(`session:${decoded.id}:*`);
    if (keys.length === 0) {
      // fallback DB check
      const session = await Session.findOne({
        where: {
          userId: decoded.id,
          isValid: true,
        },
      });

      if (!session) {
        return res.status(401).json({ message: "Session expired" });
      }
    }

    req.user = decoded;

    next();
  } catch(err) {
    return res.status(401).json({ message: err.message });
  }
};