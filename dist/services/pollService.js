"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Poll_1 = __importDefault(require("../models/Poll"));
const mongoose_1 = require("mongoose");
const createPoll = async (question, options, userId) => {
    const poll = new Poll_1.default({
        question,
        options: options.map(text => ({ text, votes: 0 })),
        createdBy: new mongoose_1.Types.ObjectId(userId)
    });
    return await poll.save();
};
const votePoll = async (pollId, optionId) => {
    const poll = await Poll_1.default.findById(pollId);
    if (!poll)
        throw new Error("Poll not found");
    const option = poll.options.id(optionId);
    if (!option)
        throw new Error("Option not found");
    option.votes += 1;
    await poll.save();
    return poll;
};
const getPolls = async () => {
    return Poll_1.default.find().sort({ createdAt: -1 });
};
exports.default = { createPoll, votePoll, getPolls };
//# sourceMappingURL=pollService.js.map