import { Router } from "express";
import { handleRefreshToken } from "./refresh.controller";

const router = Router();

router.post("/", handleRefreshToken);

export default router;
