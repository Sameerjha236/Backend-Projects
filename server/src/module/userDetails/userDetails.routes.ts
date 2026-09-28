import { Router } from "express";
import { listUserDetails } from "./userDetails.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listUserDetails);

export default router;
