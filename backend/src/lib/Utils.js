import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();    
export const generateToken = (id,res) => {  
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });
        
        const isProduction = process.env.NODE_ENV === 'production';
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction, // Only use secure in production (HTTPS)
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: isProduction ? "none" : "lax", // Use 'lax' for development, 'none' for production cross-site
            path: '/',
            domain: isProduction ? undefined : undefined // Let browser handle domain
        });
        return token;
    };