import { Router } from "express";
import { handleLogin } from "./controller";

const router = Router();

router.post("/", handleLogin);

export default router;
