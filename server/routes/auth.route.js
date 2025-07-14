import express from "express"
import {getCurrentAdmin, login, logout, signup } from "../controller/admin.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout)

router.get("/me",protectRoute, getCurrentAdmin);

export default router;