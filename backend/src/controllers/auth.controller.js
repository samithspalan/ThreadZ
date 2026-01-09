import { generateToken } from '../lib/Utils.js';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendWelcomeEmail } from '../email/emailhandlers.js';
import "dotenv/config";
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
   try{
     if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if(!/\S+@\S+\.\S+/.test(email)){
        return res.status(400).json({ message: 'Invalid email format' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ name, email, password: hashedPassword });
    if(newUser){
        generateToken(newUser._id,res);
        const savedUser = await newUser.save();
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
        });
      //  try{
      //   await sendWelcomeEmail(savedUser.email, savedUser.name, process.env.CLIENT_URL);
      //  } catch (error) {
      //      console.error('Error sending welcome email:', error);
      //  }
    } else {
        res.status(500).json({ message: 'Error creating user' });
    }
   } catch (error) {
       console.error('Error during signup:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    generateToken(user._id, res);

    // 4. Send safe user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export function logout (_, res) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/'
    });
    res.status(200).json({ message: 'Logged out successfully' });
}   

export const updateprofile=async(req,res)=>{
    try {
        const { profilePic } = req.body;
        if(!profilePic){
            return res.status(400).json({ message: 'Profile picture is required' });
        }   
        const user = await User.findById(req.user._id);
        const uploadResult = await cloudinary.uploader.upload(profilePic); 
        const Updateduser = await User.findByIdAndUpdate(req.user._id, {
            profilePic: uploadResult.secure_url,
        }, { new: true });
        res.status(200).json({ message: 'Profile updated successfully', profilePic: Updateduser.profilePic });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

// Debug endpoint to check auth status
export const checkAuthStatus = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('Check auth - Has token:', !!token);
        console.log('Check auth - Cookies received:', Object.keys(req.cookies));
        
        if (!token) {
            return res.status(401).json({ message: 'No token found' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error('Check auth error:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};