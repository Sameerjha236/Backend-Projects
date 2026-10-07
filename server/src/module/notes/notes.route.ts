import { Router } from "express";
import {
  uploadNote,
  createNote,
  getNotes,
  getNoteById,
  getNoteHtml,
} from "./notes.controller";

import { upload } from "../../middleware/multerMiddleware";

const router = Router();

router.post("/upload", upload.single("file"), uploadNote);
router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.get("/:id/html", getNoteHtml);

export default router;
