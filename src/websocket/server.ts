import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { instrument } from "@socket.io/admin-ui";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [process.env.CLIENT_URL || "http://localhost:5173", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("clientMsg", (data) => {
    console.log(`Message received: ${JSON.stringify(data)}`);
    if (data.room === "") {
      io.sockets.emit("serverMsg", data);
    } else {
      socket.join(data.room);
      io.to(data.room).emit("serverMsg", data);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
