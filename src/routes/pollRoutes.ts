import express from "express";
import { createPoll, votePoll, getPolls } from "../controllers/pollController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createPoll);   
router.post("/vote", authMiddleware, votePoll); 
router.get("/", getPolls);                      

export default router;
