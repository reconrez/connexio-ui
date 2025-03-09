const express = require("express"); // Import User model
const {initiatePayment, paymentStatus} = require("../controllers/paymentController"); // Import PaymentHistory model

const router = express.Router();

// Initiate Payment
router.post("/pay", initiatePayment);

// Check Payment status
router.get("/pay/status/:merchantTransactionId", paymentStatus);

module.exports = router;
