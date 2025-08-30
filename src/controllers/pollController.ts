import { Request, Response } from "express";
import pollService from "../services/pollService";
import { updateUserStreak } from "../services/streakService";

// extend Request type
interface AuthRequest extends Request {
  user?: { _id: string };
}

export const createPoll = async (req: AuthRequest, res: Response) => {
  try {
    const { question, options } = req.body;
    const userId = req.user?._id; // ✅ comes from authMiddleware

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const poll = await pollService.createPoll(question, options, userId);

    // update streak
    await updateUserStreak(userId);

    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const votePoll = async (req: AuthRequest, res: Response) => {
  try {
    const { pollId, optionId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const poll = await pollService.votePoll(pollId, optionId, userId);
    await updateUserStreak(userId);

    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getPolls = async (req: Request, res: Response) => {
  try {
    const polls = await pollService.getPolls();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { pollId, text } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const poll = await pollService.addComment(pollId, userId, text);
    await updateUserStreak(userId);

    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
