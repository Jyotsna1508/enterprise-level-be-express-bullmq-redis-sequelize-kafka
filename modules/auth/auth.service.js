import redis from "../../config/redis.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { User } from "./auth.model.js";
import bcrypt from "bcrypt";
import { Session } from "./session.model.js";
export const register = async (userData) => {
  const { name, email, password } = userData;
  const IfUserExist = await User.findOne({ where: { email } });
  if (IfUserExist) throw new Error("user already exits");
  console.log("IfUserExist", IfUserExist);
  const newPass = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: newPass });
  return { id: user.id, name, email };
};

export const login = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid Credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error("Incorrect Password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const refreshTokenHash = await bcrypt.hash(accessToken, 10);
  const deviceId = req.cookies.deviceId || crypto.randomUUID();
  await Session.create({
      userId: user.id,
      deviceId,
      refreshTokenHash,
      expiresAt: 7 * 24 * 60 * 60 * 1000,
  })
  await redis.sAdd(`session:${user.id}`, deviceId);
    await redis.set(
    `session:${user.id}:${deviceId}`,
    refreshToken,
    { EX: 7 * 24 * 60 * 60 }
    );
  return { user, accessToken, refreshToken, deviceId };
};

export const refresh = async(cookies) => {
     const { refreshToken, deviceId } = cookies;

    if (!refreshToken || !deviceId) {
      throw new Error("Missing tokens");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const userId = decoded.id;

    // 1. Redis check
    const redisToken = await redis.get(
      `session:${userId}:${deviceId}`
    );

    if (redisToken && redisToken !== refreshToken) {
      throw new Error("Invalid session");
    }

    // 2. DB fallback
    const session = await Session.findOne({
      where: { userId, deviceId, isValid: true },
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const match = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash
    );

    if (!match) {
      throw new Error("Token mismatch");
    }

    const newAccessToken = generateAccessToken(decoded);
    const newRefreshToken = generateRefreshToken(decoded);

    const hashed = await bcrypt.hash(newRefreshToken, 10);

    await session.update({
      refreshTokenHash: hashed,
    });

    await redis.set(
      `session:${userId}:${deviceId}`,
      newRefreshToken,
      { EX: 7 * 24 * 60 * 60 }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };

}

export const logout = async (userId, deviceId) => {
    await redis.del(`session:${userId}:${deviceId}`);
    await redis.sRem(`session:${userId}`, deviceId);

    await Session.update(
      { isValid: false },
      { where: { userId, deviceId } }
    );
  return true;
};
