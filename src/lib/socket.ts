// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://websocket-patient-waterfall-3880.fly.dev/");
socket.on("connect", () => {
  console.log("Connected to WebSocket server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;
