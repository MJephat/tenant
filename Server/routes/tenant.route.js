import express from "express"
import { protectRouter } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRouter, getTenants)
router.post("/", protectRouter ,postTenant);
router.get(":/tenantId", protectRouter, getOneTenant)

export default router;