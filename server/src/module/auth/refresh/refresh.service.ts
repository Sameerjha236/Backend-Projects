import { generateAccessToken, verifyRefreshToken } from "../../../utils/jwt";

export const refreshAccessToken = (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  return {
    accessToken,
  };
};
