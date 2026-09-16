import type { Request, Response } from "express";
import { getUserDetails } from "./userDetails.service";

export const listUserDetails = async (_req: Request, res: Response) => {
  try {
    const users = await getUserDetails();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
