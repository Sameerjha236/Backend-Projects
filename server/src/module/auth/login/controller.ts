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
