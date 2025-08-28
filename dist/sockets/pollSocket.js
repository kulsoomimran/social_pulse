"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pollSocket;
const Poll_1 = __importDefault(require("../models/Poll"));
function pollSocket(io) {
    io.on("connection", (socket) => {
        console.log("⚡️ User connected:", socket.id);
        socket.on("getPolls", async () => {
            try {
                const polls = await Poll_1.default.find();
                socket.emit("pollsData", polls);
            }
            catch (err) {
                console.error("Error fetching polls:", err);
            }
        });
        socket.on("createPoll", async (data) => {
            try {
                const newPoll = new Poll_1.default(data);
                await newPoll.save();
                io.emit("pollCreated", newPoll);
            }
            catch (err) {
                console.error("Error creating poll:", err);
            }
        });
        socket.on("votePoll", async ({ pollId, optionId }) => {
            try {
                const poll = await Poll_1.default.findById(pollId);
                if (!poll)
                    return;
                const option = poll.options.id(optionId);
                if (!option)
                    return;
                option.votes += 1;
                await poll.save();
                io.emit("pollUpdated", poll);
            }
            catch (err) {
                console.error("Error voting poll:", err);
            }
        });
        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });
}
//# sourceMappingURL=pollSocket.js.map