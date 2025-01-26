"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://task-collab-omega.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("taskAdded", (task) => {
        console.log(`Task added: ${JSON.stringify(task)}`);
        io.emit("taskAdded", task);
    });
    socket.on("taskCompleted", (updatedTask) => {
        console.log(`Task toggled: ${updatedTask.text}, Completed: ${updatedTask.completed}`);
        io.emit("taskCompleted", updatedTask);
    });
    socket.on("taskDeleted", (id) => {
        console.log(`Task deleted: ${id}`);
        io.emit("taskDeleted", id);
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
// Use the PORT environment variable set by Fly.io, defaulting to 3000
const PORT = parseInt(process.env.PORT || "3000", 10);
// Ensure the app listens on 0.0.0.0 to allow external connections
server.listen(PORT, "0.0.0.0", () => {
    console.log(`WebSocket server running on http://0.0.0.0:${PORT}`);
});
// Add a health check endpoint for Fly.io
app.get("/health", (req, res) => {
    res.send("OK");
});
