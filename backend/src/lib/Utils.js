import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();    
export const generateToken = (id,res) => {  
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });
        
        // Support both NODE_ENV and legacy node_env to avoid misconfig on hosts
        const envValue = process.env.NODE_ENV || process.env.node_env;
        const isProduction = envValue === 'production';
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction, // Only use secure in production (HTTPS)
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: isProduction ? "none" : "lax", // Use 'lax' for development, 'none' for production cross-site
            path: '/',
            domain: undefined // Let browser handle domain
        });
        return token;
    };