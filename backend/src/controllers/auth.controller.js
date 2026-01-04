import { generateToken } from '../lib/Utils.js';
import user from '../model/User.js';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../email/emailhandlers.js';
import "dotenv/config";
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
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
       try{
        await sendWelcomeEmail(savedUser.email, savedUser.name, process.env.CLIENT_URL);
       } catch (error) {
           console.error('Error sending welcome email:', error);
       }
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
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export function logout (_, res) {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}   