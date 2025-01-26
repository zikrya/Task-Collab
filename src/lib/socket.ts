// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8008");
socket.on("connect", () => {
  console.log("Connected to WebSocket server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;
