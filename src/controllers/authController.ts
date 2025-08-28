import { Request, Response } from "express";
import authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const tokens = await authService.login(req.body);
    res.json(tokens);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const accessToken = authService.refresh(token);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
