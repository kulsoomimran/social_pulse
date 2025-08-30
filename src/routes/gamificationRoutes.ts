import express from "express";
import { getLeaderboard } from "../controllers/gamificationController";

const router = express.Router();
router.get("/leaderboard", getLeaderboard);

export default router;