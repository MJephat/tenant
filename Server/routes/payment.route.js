import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { deletePayment, editPayment, getAllPaidTenants, getAllPayments, getPaymentHistory, getPaymentsByMonth, getTenantPaymentHistoryByName, payRent } from '../controller/payment.controller.js';


const router = express.Router();

router.get("/" , protectRoute, getAllPayments)
router.post("/payrent/:id", protectRoute, payRent)
router.get("/paidtenant",protectRoute, getAllPaidTenants)
router.get("/history/:id", protectRoute, getPaymentHistory)
router.put("/editpayment/:id", protectRoute, editPayment)
router.get("/monthlysummary/:id", protectRoute, getPaymentHistory)
router.get("/getHistoryByName", protectRoute, getTenantPaymentHistoryByName) // Assuming this is the correct endpoint for tenant name
router.get("/summary", protectRoute, getPaymentsByMonth)
router.delete("/:id", protectRoute, deletePayment)

export default router;