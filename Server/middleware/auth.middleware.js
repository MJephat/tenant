import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js"

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies["jwt-admin"];

		if (!token) {
			return res.status(401).json({ message: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ message: "Unauthorized - Invalid Token" });
		}

		const admin = await Admin.findById(decoded.adminId).select("-password");

		if (!admin) {
			return res.status(401).json({ message: "User not found" });
		}

		req.admin = admin;

		next();
	} catch (error) {
		console.error("Error in protectRoute middleware:", error.message);
		res.status(401).json({ message: "Authentication failed" });
	}
};
