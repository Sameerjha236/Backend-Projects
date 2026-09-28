import type { Request, Response } from "express";
import { refreshAccessToken } from "./service";

export const handleRefreshToken = (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const result = refreshAccessToken(refreshToken);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Invalid refresh token",
    });
  }
};
