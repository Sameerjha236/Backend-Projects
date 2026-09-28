import type { Request, Response } from "express";
import { loginUser } from "./service";

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await loginUser({ username, password });

    if (!result.success) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
