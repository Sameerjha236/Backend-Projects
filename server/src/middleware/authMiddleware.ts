import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization header",
    });
  }

  try {
    const decodedToken = verifyAccessToken(token);
    req.user = decodedToken;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
