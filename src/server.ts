import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import pollRoutes from "./routes/pollRoutes";
import pollSocket from "./sockets/pollSocket";   // ✅ import

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

// Root test
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Social Pulse Backend with TypeScript is running...");
});

// Database
connectDB();

// Sockets
pollSocket(io);   // ✅ attach poll socket logic

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
