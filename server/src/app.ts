import express from "express";
import cors from "cors";
import userDetailsRoutes from "./module/userDetails/userDetails.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user-details", userDetailsRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

export default app;
