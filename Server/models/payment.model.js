import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            return "PAY-" + this._id.toString().slice(-6);
        }
    },
    amountPaid: {
        type: Number,
        required: true
    },
    rentAmount: {
        type: Number,
        required: true
    },
    electricityBill: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Mpesa', 'Other'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Partially',],
        default: 'Partially'
    },
    paymentMonth: {
        type: Date,
        required: true
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
paymentSchema.index({ tenantId: 1, paymentMonth: 1, transactionId: 1 });
// paymentSchema.index({ transactionId: 1 });

// Add a method to calculate remaining balance
paymentSchema.methods.calculateBalance = function() {
    return (this.rentAmount + this.electricityBill) - this.amountPaid;
};

// Pre-save middleware to update balance
paymentSchema.pre('save', function(next) {
    this.balance = this.calculateBalance();
    next();
});

// Static method to get payment history for a tenant
paymentSchema.statics.getPaymentHistory = async function(tenantId) {
    return this.find({ tenantId })
        .sort({ paymentMonth: -1 })
        .populate('tenantId', 'name roomNumber')
        .populate('paidBy', 'name');
};

// Static method to get monthly payment summary
paymentSchema.statics.getMonthlyPaymentSummary = async function(month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amountPaid" },
                totalRent: { $sum: "$rentAmount" },
                totalElectricityBill: { $sum: "$electricityBill" },
                count: { $sum: 1 }
            }
        }
    ]);
};

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
