import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import path from 'path';
import authRoutes from './src/routes/auth.js';
import messageroutes from './src/routes/message.route.js';
import db from "./src/lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from "./src/lib/socket.js";

dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageroutes);

// make ready for deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//  app.get(/^(?!\/api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });


// }

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  db();
});