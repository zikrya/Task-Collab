import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

  socket.on("taskCompleted", (id) => {
    console.log(`Task completed: ${id}`);
    io.emit("taskCompleted", id);
  });

  socket.on("taskDeleted", (id) => {
    console.log(`Task deleted: ${id}`);
    io.emit("taskDeleted", id);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = 8008;
server.listen(PORT, () => {
  console.log(`WebSocket server running on http://localhost:${PORT}`);
});
