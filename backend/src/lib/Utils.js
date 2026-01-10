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

        const cookieOptions = {
            httpOnly: true,
            secure: true, // Only use secure in production (HTTPS)
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            sameSite: "none", // Use 'lax' for development, 'none' for production cross-site
            path: '/',
            domain: undefined // Let browser handle domain
        };

        console.log("Set-Cookie token", {
            envValue,
            isProduction,
            sameSite: cookieOptions.sameSite,
            secure: cookieOptions.secure,
        });

        res.cookie('token', token, cookieOptions);
        return token;
    };