import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import { get } from 'mongoose';

export const signup = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        // Add your signup logic here
        if(!username || !password || !role || !email) {
            return res.status(400).json({ message: 'Username and password and role are required' });
        }
        // Check if the admin already exists
        const emailExist = await Admin.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        if (password.lenth < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            username,
            password: hashedPassword,
            email,
            role
        });
        await admin.save();

        const token = jwt.sign( {adminId:admin._id}, process.env.JWT_SECRET,{expiresIn:"3d"})

        res.cookie("jwt-admin", token, {
            httpOnly: true, //prevent XSS atacks
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",  // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production", //prevents man-in-the-middle attacks
        })

        res.status(201).json({ message: 'Admin created successfully' });

    } catch (error) {
        console.error('Error in signup:', error.message);
        res.status(500).json({ message: 'Error creating admin' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Add your login logic here
        if(!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {expiresIn: "3d"});
        res.cookie("jwt-admin", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }); // 3 days

        res.json({ message: "Logged in Successfully" })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('jwt-admin');
    res.status(200).json({ message: 'Logout successful' });
}

export const getCurrentAdmin = async (req, res) => {
    try {
        res.json(req.admin);
    } catch (error) {
        res.error('Error fetching admins', error );
        res.status(500).json({ message: 'Error fetching admins', error });
    }

}