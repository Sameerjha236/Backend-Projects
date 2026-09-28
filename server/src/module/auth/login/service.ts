import { generateAccessToken } from "../../../utils/jwt";

interface LoginParams {
  username?: string;
  password?: string;
}

// Dummy user database for demonstration
const DUMMY_USERS = [
  {
    id: "1",
    username: "admin",
    password: "qwer",
    name: "Admin User",
    email: "admin@example.com",
  },
  {
    id: "2",
    username: "user",
    password: "password123",
    name: "Standard User",
    email: "user@example.com",
  },
];

export const loginUser = async ({ username, password }: LoginParams) => {
  if (!username || !password) {
    return {
      success: false,
      status: 400,
      message: "Username and password are required",
    };
  }

  const user = DUMMY_USERS.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return {
      success: false,
      status: 401,
      message: "Invalid username or password",
    };
  }

  // Return user info (excluding password)
  const { password: _, ...userWithoutPassword } = user;

  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });

  return {
    success: true,
    status: 200,
    message: "Login successful",
    data: {
      user: userWithoutPassword,
      accessToken: accessToken,
    },
  };
};
