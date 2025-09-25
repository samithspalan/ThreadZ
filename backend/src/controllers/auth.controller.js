import { generateToken } from '../lib/Utils.js';
import user from '../model/User.js';
import bcrypt from 'bcryptjs';
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
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new user({ name, email, password: hashedPassword });
    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(500).json({ message: 'Error creating user' });
    }
   } catch (error) {
       console.error('Error during signup:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
}
export function login (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
}