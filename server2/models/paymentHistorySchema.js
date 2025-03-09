const mongoose = require("mongoose");

const PaymentHistorySchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the User model for the transaction
  },
  amount: {
    type: Number,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    enum: ["PAYMENT_INITIATED", "SUCCESS", "PAYMENT_FAILED" ],
    required: true,
    default: "PAYMENT_INITIATED",
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});
// Optional: Add compound index to prevent duplicate transactions
PaymentHistorySchema.index({ lastUpdatedAt: 1 });
PaymentHistorySchema.index({ transactionId: 1, userId: 1 }, { unique: true });

const PaymentHistory = mongoose.model("PaymentHistory", PaymentHistorySchema);

module.exports = { PaymentHistory };