import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

if (!jwt_secret || !refresh_token_secret) {
  throw new Error("JWT secret or refresh token secret not found");
}

export type JwtPayload = {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
};

export const generateAccessToken = (
  payload: Omit<JwtPayload, "iat" | "exp">,
) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: "15m" });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, refresh_token_secret, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, jwt_secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refresh_token_secret) as JwtPayload & {
    iat: number;
    exp: number;
  };
};
