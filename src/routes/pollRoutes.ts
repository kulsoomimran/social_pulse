import express from "express";
import { createPoll, votePoll, getPolls, addComment } from "../controllers/pollController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createPoll);   
router.post("/vote", authMiddleware, votePoll); 
router.post("/comment", authMiddleware, addComment);
router.get("/", getPolls);                      

export default router;
