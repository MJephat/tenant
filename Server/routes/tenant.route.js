import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { addTenant, deleteTenant, getTenant, getTenants, updateTenant } from "../controller/tenant.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getTenants)
router.post("/",protectRoute ,addTenant);
router.get("/:id", protectRoute, getTenant)
router.put("/:id", protectRoute, updateTenant)
router.delete("/:id", protectRoute, deleteTenant)

export default router;