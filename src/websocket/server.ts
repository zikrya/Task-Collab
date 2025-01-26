import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
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

const PORT = parseInt(process.env.PORT || "3000", 10);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`WebSocket server running on http://0.0.0.0:${PORT}`);
});

app.get("/health", (req, res) => {
  res.send("OK");
});
