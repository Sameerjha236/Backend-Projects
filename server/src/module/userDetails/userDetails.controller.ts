import type { Request, Response } from "express";
import { getUserDetails } from "./userDetails.service";

export const listUserDetails = async (req: Request, res: Response) => {
  try {
    // Parse query params — default to page 1, 10 items per page
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limit = Math.min(
      100, // hard cap so clients can't request everything at once
      Math.max(1, parseInt(String(req.query.limit ?? "10"), 10) || 10),
    );

    const result = await getUserDetails(page, limit);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

