import jwt from "jsonwebtoken";
export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "15m",
    },
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id},
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "7d" },
  );
}
