import type { Request, Response } from "express";

export const uploadNote = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Note uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    return res.status(201).json({
      message: "Note created successfully",
      data: { title, content },
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
