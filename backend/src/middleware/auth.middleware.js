import "dotenv/config";
import User from '../model/User.js';
import jwt from 'jsonwebtoken';
export const finduser=async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        
        // Debug logging
        console.log('Auth check - Cookie exists:', !!token);
        console.log('Auth check - All cookies:', Object.keys(req.cookies));
        
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }   
}