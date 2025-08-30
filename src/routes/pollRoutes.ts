import express from "express";
import { createPoll, votePoll, getPolls, addComment, getComments, addReaction } from "../controllers/pollController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createPoll);   
router.post("/:pollId/vote", authMiddleware, votePoll); 
router.post("/comment", authMiddleware, addComment);
router.get("/", authMiddleware, getPolls);
router.get("/:pollId/comments", getComments);
router.post("/comments/:commentId/reactions", authMiddleware, addReaction);


export default router;
