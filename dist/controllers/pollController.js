"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPolls = exports.votePoll = exports.createPoll = void 0;
const pollService_1 = __importDefault(require("../services/pollService"));
const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;
        const userId = req.userId; // set by auth middleware
        const poll = await pollService_1.default.createPoll(question, options, userId);
        res.json(poll);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createPoll = createPoll;
const votePoll = async (req, res) => {
    try {
        const { pollId, optionId } = req.body;
        const poll = await pollService_1.default.votePoll(pollId, optionId);
        res.json(poll);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.votePoll = votePoll;
const getPolls = async (req, res) => {
    try {
        const polls = await pollService_1.default.getPolls();
        res.json(polls);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getPolls = getPolls;
//# sourceMappingURL=pollController.js.map