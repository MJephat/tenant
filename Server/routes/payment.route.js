import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { editPayment, getAllPaidTenants, getAllPayments, getMonthlyPaymentSummary, getPaymentHistory, getPaymentsByMonth, payRent } from '../controller/payment.controller.js';


const router = express.Router();

router.post("/payrent/:id", protectRoute, payRent)
router.get("/paidtenant",protectRoute, getAllPaidTenants)
router.get("/history/:id", protectRoute, getPaymentHistory)
router.post("/editpayment/:id", protectRoute, editPayment)
router.get("/monthlysummary", protectRoute, getMonthlyPaymentSummary)
router.get("/" , protectRoute, getAllPayments)
router.get("/summary", protectRoute, getPaymentsByMonth)

export default router;