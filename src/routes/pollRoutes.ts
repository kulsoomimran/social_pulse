import express from "express";
import { createPoll, votePoll, getPolls, addComment, getComments, addReaction } from "../controllers/pollController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", createPoll);   
router.post("/:pollId/vote", votePoll); 
router.post("/comment", addComment);
router.get("/", getPolls);
router.get("/:pollId/comments", getComments);
router.post("/comments/:commentId/reactions", addReaction);


export default router;
