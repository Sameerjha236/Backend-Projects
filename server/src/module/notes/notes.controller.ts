import type { Request, Response } from "express";
import {
  uploadNoteService,
  createNoteService,
  getNotesService,
  getNoteByIdService,
} from "./notes.service";

export const uploadNote = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File required" });
    }

    if (
      !file.originalname.toLowerCase().endsWith(".md") ||
      file.mimetype !== "text/markdown"
    ) {
      return res.status(400).json({
        message: "Only Markdown files are allowed",
      });
    }

    const data = await uploadNoteService(file, body);

    return res.status(200).json({
      message: "Note uploaded successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, desc, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const data = await createNoteService(title, desc || "", content);

    return res.status(201).json({
      message: "Note created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await getNotesService();
    return res.status(200).json({
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Note ID is required",
      });
    }
    const note = await getNoteByIdService(String(id));

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getNoteHtml = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      message: "Note HTML fetched successfully",
      data: { id, html: "" },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
