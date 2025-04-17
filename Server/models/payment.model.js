import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  month: { type: String, required: true }, // e.g., 'April 2025'

  rent: {
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    paidAt: { type: Date, default: null }
  },
  electricity: {
    amount: { type: Number, default: 0 },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    paidAt: { type: Date, default: null }
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
