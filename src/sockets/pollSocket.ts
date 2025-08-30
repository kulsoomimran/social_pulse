// sockets/pollSocket.ts
import { Server, Socket } from "socket.io";
import Poll from "../models/Poll";
import pollService from "../services/pollService";

export default function pollSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("⚡️ User connected:", socket.id);

    socket.on("getPolls", async () => {
      try {
        const polls = await Poll.find();
        socket.emit("pollsData", polls);
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    });

    socket.on("createPoll", async (data) => {
      try {
        const newPoll = new Poll(data);
        await newPoll.save();

        io.emit("pollCreated", newPoll);
      } catch (err) {
        console.error("Error creating poll:", err);
      }
    });

    socket.on("votePoll", async ({ pollId, optionId }) => {
      try {
        const poll = await Poll.findById(pollId);
        if (!poll) return;

        const option = poll.options.id(optionId);
        if (!option) return;

        option.votes += 1;
        await poll.save();

        io.emit("pollUpdated", poll);
      } catch (err) {
        console.error("Error voting poll:", err);
      }
    });

    socket.on("comment", async ({ pollId, userId, text }) => {
  const poll = await pollService.addComment(pollId, userId, text);
  if (poll) io.emit("pollUpdated", poll); // broadcast updated poll with comments
});


    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}
