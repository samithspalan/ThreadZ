import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import  dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com"
  ],
  credentials: true
}));


// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.name);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // Send the current list of online users to this newly connected client
  socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  // Broadcast to all clients that user count has changed
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle explicit request for online users
  socket.on("requestOnlineUsers", () => {
    socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.name);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };