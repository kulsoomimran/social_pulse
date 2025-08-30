// import Poll, { IPoll } from "../models/Poll";
// import { Types } from "mongoose";

// const createPoll = async (question: string, options: string[], userId: string): Promise<IPoll> => {
//   const poll = new Poll({
//     question,
//     options: options.map(text => ({ text, votes: 0 })),
//     createdBy: new Types.ObjectId(userId)
//   });
//   return await poll.save();
// };

// const votePoll = async (pollId: string, optionId: string): Promise<IPoll | null> => {
//   const poll = await Poll.findById(pollId);
//   if (!poll) throw new Error("Poll not found");

//   const option = poll.options.id(optionId);
//   if (!option) throw new Error("Option not found");

//   option.votes += 1;
//   await poll.save();
//   return poll;
// };

// const addComment = async (pollId: string, userId: string, text: string): Promise<IPoll | null> => {
//   const poll = await Poll.findById(pollId);
//   if (!poll) throw new Error("Poll not found");

//   poll.comments.push({
//     user: new Types.ObjectId(userId),
//     text,
//     createdAt: new Date()
//   });

//   await poll.save();
//   return poll;
// };

// const getPolls = async (): Promise<IPoll[]> => {
//   return Poll.find().sort({ createdAt: -1 }).populate("comments.user", "username email");
// };

// export default { createPoll, votePoll, addComment, getPolls };

import Poll, { IPoll } from "../models/Poll";
import { Types } from "mongoose";
import { updateUserPoints } from "./gamificationService";  // 👈 import gamification

const createPoll = async (question: string, options: string[], userId: string): Promise<IPoll> => {
  const poll = new Poll({
    question,
    options: options.map(text => ({ text, votes: 0 })),
    createdBy: new Types.ObjectId(userId)
  });

  const savedPoll = await poll.save();

  // 🎯 Gamification: reward poll creation
  await updateUserPoints(userId, 5);

  return savedPoll;
};

const votePoll = async (pollId: string, optionId: string, userId: string): Promise<IPoll | null> => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error("Poll not found");

  const option = poll.options.id(optionId);
  if (!option) throw new Error("Option not found");

  option.votes += 1;
  await poll.save();

  // 🎯 Gamification: reward voting
  await updateUserPoints(userId, 1);

  return poll;
};

const addComment = async (pollId: string, userId: string, text: string): Promise<IPoll | null> => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error("Poll not found");

  poll.comments.push({
    user: new Types.ObjectId(userId),
    text,
    createdAt: new Date()
  });

  await poll.save();

  // 🎯 Gamification: reward commenting
  await updateUserPoints(userId, 2);

  return poll;
};

const getPolls = async (): Promise<IPoll[]> => {
  return Poll.find().sort({ createdAt: -1 }).populate("comments.user", "username email");
};

const getPollById = async (pollId: string): Promise<IPoll | null> => {
  return Poll.findById(pollId).populate("comments.user", "username email");
};

const addReaction = async (commentId: string, userId: string, type: string): Promise<IPoll | null> => {
  const poll = await Poll.findOne({ "comments._id": commentId });
  if (!poll) throw new Error("Poll not found");

  const comment = poll.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");
  comment.reactions = comment.reactions.filter(r => r.user.toString() !== userId);
  comment.reactions.push({ user: new Types.ObjectId(userId), type });

  await poll.save();
  return poll;
};


export default { createPoll, votePoll, addComment, getPolls, getPollById, addReaction };


