import type { Request, Response } from "express";
import { uploadNoteService, createNoteService } from "./notes.service";

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
    return res.status(200).json({
      message: "Notes fetched successfully",
      data: [],
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

    return res.status(200).json({
      message: "Note fetched successfully",
      data: { id },
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
