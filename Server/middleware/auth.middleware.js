import Admin from "../models/admin.model.js";
import jwt from 'jsonwebtoken';

export const protectRouter = async (req, res, next) => {
    try{
        const token = req.cookies["jwt-admin"];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
        }
        // Verify the token and extract user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
        }
        const admin = await Admin.findById(decoded.AdminId).select("-password");
        if(!admin) {
            return res.status(401).json({ message: 'Admin not found' });
        }
        req.admin = admin;

        next();
    }catch(error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};