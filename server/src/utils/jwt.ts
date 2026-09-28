import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;

if (!jwt_secret) {
  throw new Error("JWT secret not found");
}

export type JwtPayload = {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
};

export const generateAccessToken = (payload: Omit<JwtPayload, "iat" | "exp">) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: "15m" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, jwt_secret) as JwtPayload;
};
