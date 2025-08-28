import Poll, { IPoll } from "../models/Poll";
import { Types } from "mongoose";

const createPoll = async (question: string, options: string[], userId: string): Promise<IPoll> => {
    const poll = new Poll({
        question,
        options: options.map(text => ({ text, votes: 0 })),
        createdBy: new Types.ObjectId(userId)
    });
    return await poll.save();
};

const votePoll = async (pollId: string, optionId: string): Promise<IPoll | null> => {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("Poll not found");

    const option = poll.options.id(optionId);
    if (!option) throw new Error("Option not found");

    option.votes += 1;
    await poll.save();
    return poll;
};

const getPolls = async (): Promise<IPoll[]> => {
    return Poll.find().sort({ createdAt: -1 });
};

export default { createPoll, votePoll, getPolls };
