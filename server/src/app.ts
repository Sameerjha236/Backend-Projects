import express from "express";
import cors from "cors";
import userDetailsRoutes from "./module/userDetails/userDetails.routes";
import loginRoutes from "./module/auth/login/route";
import refreshRoutes from "./module/auth/refresh/route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/user-details", userDetailsRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/auth/refresh", refreshRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

export default app;
