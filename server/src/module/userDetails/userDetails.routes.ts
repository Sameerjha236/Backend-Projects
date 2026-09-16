import { Router } from "express";
import { listUserDetails } from "./userDetails.controller";

const router = Router();

router.get("/", listUserDetails);

export default router;
