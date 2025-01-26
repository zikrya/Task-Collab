import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8008";

if (typeof window !== "undefined") {
  console.log("Socket URL (Frontend):", SOCKET_URL);
}

const socket: Socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to WebSocket server", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;

