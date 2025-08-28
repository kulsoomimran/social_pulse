import { Request, Response } from "express";
import pollService from "../services/pollService";

export const createPoll = async (req: Request, res: Response) => {
  try {
    const { question, options } = req.body;
    const userId = (req as any).userId; // set by auth middleware
    const poll = await pollService.createPoll(question, options, userId);
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const votePoll = async (req: Request, res: Response) => {
  try {
    const { pollId, optionId } = req.body;
    const poll = await pollService.votePoll(pollId, optionId);
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
