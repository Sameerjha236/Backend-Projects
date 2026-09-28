import { Router } from "express";
import { handleRefreshToken } from "./controller";

const router = Router();

router.post("/", handleRefreshToken);

export default router;
