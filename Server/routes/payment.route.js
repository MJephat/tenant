import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { deletePayment, editPayment, getAllPaidTenants, getAllPayments, getMonthlyPaymentSummary, getPaymentHistory, getPaymentsByMonth, payRent } from '../controller/payment.controller.js';


const router = express.Router();

router.get("/" , protectRoute, getAllPayments)
router.post("/payrent/:id", protectRoute, payRent)
router.get("/paidtenant",protectRoute, getAllPaidTenants)
router.get("/history/:id", protectRoute, getPaymentHistory)
router.put("/editpayment/:id", protectRoute, editPayment)
router.get("/monthlysummary", protectRoute, getMonthlyPaymentSummary)
router.get("/summary", protectRoute, getPaymentsByMonth)
router.delete("/:id", protectRoute, deletePayment)

export default router;