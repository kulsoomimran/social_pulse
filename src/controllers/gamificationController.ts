import { Request, Response } from "express";
import User from "../models/User";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select("username points badges");
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
