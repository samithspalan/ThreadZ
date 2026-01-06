import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();    
export const generateToken = (id,res) => {  
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/' // Ensure cookie is sent with all requests
        });
        return token;
    };