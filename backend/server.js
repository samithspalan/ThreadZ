import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
import authRoutes from './src/routes/auth.js';

// Basic route
app.use('/', authRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
