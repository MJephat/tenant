import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { addTenant, getTenants } from "../controller/tenant.controller.js";

const router = express.Router();

router.get("/", protectRoute, getTenants)
router.post("/",protectRoute ,addTenant);
// router.get(":/tenantId", protectRouter, getOneTenant)

export default router;