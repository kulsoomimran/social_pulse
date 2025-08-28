"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const pollRoutes_1 = __importDefault(require("./routes/pollRoutes"));
const pollSocket_1 = __importDefault(require("./sockets/pollSocket")); // ✅ import
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/polls", pollRoutes_1.default);
// Root test
app.get("/", (req, res) => {
    res.send("🚀 Social Pulse Backend with TypeScript is running...");
});
// Database
(0, db_1.default)();
// Sockets
(0, pollSocket_1.default)(io); // ✅ attach poll socket logic
// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map