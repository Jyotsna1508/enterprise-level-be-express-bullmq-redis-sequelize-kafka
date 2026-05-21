import { asyncHandler } from "../../middleware/async-handler.middleware.js";
import * as authService from "../auth/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req);
  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("deviceId", data.deviceId, { httpOnly: true });

  res.json({ message: "login success", data: data.user });
});

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.json(201).json({ message: "user created", data: user });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const data = await authService.refresh(req.cookies);

  res.cookie("accessToken", data.accessToken, { httpOnly: true });
  res.cookie("refreshToken", data.refreshToken, { httpOnly: true });

  return res.json({ message: "Refreshed" });
});

export const logout = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await authService.logout(userId, req.cookies.deviceId);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});
