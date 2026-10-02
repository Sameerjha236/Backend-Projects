import { Router } from "express";
import { handleLogin } from "./login.controller";

const router = Router();

router.post("/", handleLogin);

export default router;
