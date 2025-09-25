import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoURI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Server will continue running without database connection');
        return null;
    }
}

export default db
