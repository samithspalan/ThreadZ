import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/auth.js';
import messageroutes from './src/routes/message.route.js';
import db from './src/lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/message',messageroutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
    const dbConnection = await db();
    if (dbConnection) {
        console.log('Connected to MongoDB');
    } else {
        console.log('Running without database connection');
    }
});
