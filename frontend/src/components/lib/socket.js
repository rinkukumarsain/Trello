// src/socket.js
import { io } from "socket.io-client";

// Replace with your actual backend URL
const socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
