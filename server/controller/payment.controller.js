import mongoose from "mongoose";
import Tenant from "../models/tenant.model.js";
import Payment from "../models/payment.model.js";

// get function for all paid tenants 
export const getAllPaidTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find({ "payment.status": "Paid" });
        res.status(200).json({ tenants });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenants', error });
    }
}

// function for a tenant to pay rent that will be done by the admin in the admin dashboard
export const payRent = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!req.admin || req.admin.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can process rent payments' });
        }

        const { id } = req.params;
        const { 
            amountPaid, 
            electricityBill = 0, 
            paymentType = 'Cash',
            paymentMonth = new Date(),
            notes = ''
        } = req.body;

        const tenant = await Tenant.findById(id).session(session);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        // Create new payment record
        const payment = new Payment({
            tenantId: tenant._id,
            amountPaid,
            rentAmount: tenant.rentAmount,
            electricityBill,
            paymentType,
            paymentMonth,
            paidBy: req.admin._id,
            notes
        });

        await payment.save({ session });
        
        // const month = 1;
        // const year = 2025;
        // Update tenant payment status
        const paymentUpdate = {
            'payment.amountPaid': amountPaid,
            'payment.electricityBill': electricityBill,
            'payment.paidBy': req.admin._id,
            'payment.paidAt': new Date(),
            'payment.paymentStatus': payment.amountPaid >= (payment.rentAmount + (payment.electricityBill || 0)) ? 'Paid' : 'Partially',
            'payment.balance': payment.balance
        };

        const updatedTenant = await Tenant.findByIdAndUpdate(
            id,
            { $set: paymentUpdate },
            { new: true, session }
        );

        await session.commitTransaction();

        res.status(200).json({
            message: 'Payment processed successfully',
            payment,
            tenant: updatedTenant
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Payment processing error:', error);
        res.status(500).json({ 
            message: 'Error processing payment', 
            error: error.message 
        });
    } finally {
        session.endSession();
    }
};

// function to get payment history for a tenant
export const getPaymentHistory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid tenant ID' });
        }

        const payments = await Payment.getPaymentHistory(id);

        if (!payments || payments.length === 0) {
            return res.status(200).json({ payments: [] });
        }

        res.status(200).json({ payments });
    } catch (error) {
        console.error("Error in getPaymentHistory:", error);
        res.status(500).json({ message: 'Error fetching payment history', error: error.message });
    }
}

// function to get history for a tenant using name
export const getTenantPaymentHistoryByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Tenant name is required' });
        }

        const tenant = await Tenant.findOne({ name: new RegExp(`^${name}$`, 'i')});
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        const payments = await Payment.getPaymentHistory(tenant._id);

        if (!payments || payments.length === 0) {
            return res.status(200).json({ payments: [] });
        }

        res.status(200).json({ payments });
    } catch (error) {
        console.error("Error in getTenantPaymentHistoryByName:", error);
        res.status(500).json({ message: 'Error fetching payment history by tenant name', error: error.message });
    }
}


//function to edit payment details
export const editPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!req.admin || req.admin.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can edit payments' });
        }

        const { id } = req.params;
        const {
            amountPaid,
            electricityBill = 0,
            paymentType = 'Cash',
            paymentMonth = new Date(),
            notes = ''
        } = req.body;

        const payment = await Payment.findById(id).session(session);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update payment details
        payment.amountPaid = amountPaid;
        payment.electricityBill = electricityBill;
        payment.paymentType = paymentType;
        payment.paymentMonth = paymentMonth;
        payment.notes = notes;

        await payment.save({ session });

        // Update tenant payment status
        const paymentUpdate = {
            'payment.amountPaid': amountPaid,
            'payment.electricityBill': electricityBill,
            'payment.paidBy': req.admin._id,
            'payment.paidAt': new Date(),
            'payment.status': payment.amountPaid >= (payment.rentAmount + (payment.electricityBill || 0)) ? 'Paid' : 'Partially',
            'payment.balance': payment.balance
        };

        const updatedTenant = await Tenant.findByIdAndUpdate(
            payment.tenantId,
            { $set: paymentUpdate },
            { new: true, session }
        );

        await session.commitTransaction();

        res.status(200).json({
            message: 'Payment updated successfully',
            payment,
            tenant: updatedTenant
        });

    } catch (error) {
        await session.abortTransaction();
        console.error('Payment update error:', error);
        res.status(500).json({
            message: 'Error updating payment',
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

//get monthly summary
export const getMonthlyPaymentSummary = async (req, res) => {
    try {
        const { month, year } = req.params;
        const summary = await Payment.getMonthlyPaymentSummary(month, year);
        res.status(200).json({ summary });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching monthly payment summary', error });
    }
}

// get all payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('tenantId', 'name roomNumber')
            .populate('paidBy', 'username');
        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
}

// get monthly payment
export const getPaymentsByMonth = async (req, res) => {
    try {
      const data = await Payment.aggregate([
        {
          $group: {
            _id: { $month: "$paymentMonth" }, // Extract numeric month
            totalElectricityBill: { $sum: "$electricityBill" },
            totalAmountPaid: { $sum: "$amountPaid" }
          }
        },
        {
          $sort: { _id: 1 } // Sort by month number
        },
        {
          $addFields: {
            monthName: {
              $arrayElemAt: [
                [
                  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                "$_id"
              ]
            }
          }
        }
      ]);
  
      const formatted = data.map(item => ({
        month: item.monthName,
        totalElectricityBill: item.totalElectricityBill,
        totalAmountPaid: item.totalAmountPaid
      }));
  
      res.status(200).json({ data: formatted });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payment data', error });
    }
  };
  

// delete payment by id
export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error });
    }
}


