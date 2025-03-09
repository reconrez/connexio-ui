const express = require("express");
const axios = require("axios");
const sha256 = require("sha256");
var { v4: uuidv4 } = require('uuid');
const User = require("../models/userSchema"); // Import User model
const PaymentHistory = require("../models/paymentHistorySchema"); // Import PaymentHistory model

const initiatePayment = async (req, res) => {
try {
    const {userId, amount} = req.body; // Get user ID from frontend
    const merchantTransactionId = `MTID${uuidv4()}`; // Generate unique transaction ID

    // Find user
    const user = await User.findOne({userId});
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create PhonePe payload
    const payload = {
    merchantId: process.env.MERCHANT_ID,
    merchantTransactionId,
    merchantUserId:`UID${userId}`,
    amount: amount * 100, // Convert to paise
    redirectUrl: `${process.env.APP_BE_URL}/api/pay/status/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    paymentInstrument: { type: "PAY_PAGE" },
    };

    // Generate X-VERIFY signature
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
    const stringToSign = base64Payload + "/pg/v1/pay" + process.env.SALT_KEY;
    const xVerifyChecksum = sha256(stringToSign) + "###" + process.env.SALT_INDEX;

    // Save transaction as pending
    const transaction = new PaymentHistory({
    transactionId: merchantTransactionId,
    userId,
    amount,
    status: "PAYMENT_INITIATED",
    });
    await transaction.save();

    // Call PhonePe API
    const phonePeResponse = await axios.post(
    `${process.env.PHONE_PE_HOST_URL}/pg/v1/pay`,
    { request: base64Payload },
    { headers: { "Content-Type": "application/json", "X-VERIFY": xVerifyChecksum, accept: "application/json" } }
    );

    // Redirect user to PhonePe payment page
    return res.redirect(phonePeResponse.data.data.instrumentResponse.redirectInfo.url);
    } catch (err) {
        console.error("Payment initiation error:", err);
        return res.status(500).json({ error: "Payment initiation failed" });
    }
};

const paymentStatus = async (req, res) => {
try {
    const { merchantTransactionId } = req.params;
    const transaction = await PaymentHistory.findOne({ "transactionId": merchantTransactionId });

    if (!transaction) return res.status(404).json({ error: "Transaction not found" });

    const user = await User.findOne({ userId: transaction.userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    // Check payment status
    const statusUrl = `${process.env.PHONE_PE_HOST_URL}/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`;
    const stringToSign = `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}` + process.env.SALT_KEY;
    const xVerifyChecksum = sha256(stringToSign) + "###" + process.env.SALT_INDEX;

    const statusResponse = await axios.get(statusUrl, {
    headers: { "Content-Type": "application/json", "X-VERIFY": xVerifyChecksum, accept: "application/json" }
    });

    // Update transaction in DB
    if (statusResponse.data.code === "PAYMENT_SUCCESS") {
    transaction.status = "SUCCESS";
    user.tokens += transaction.amount / 10; // Convert amount to tokens
    } else if (statusResponse.data.code !== "PAYMENT_PENDING") {
    transaction.status = "PAYMENT_FAILED";
    }
    transaction.lastUpdatedAt = Date.now();
    await transaction.save();
    await user.save();

    return res.json({ success: true, message: "Payment status", data: statusResponse.data });
    } catch (err) {
        console.error("Payment status error:", err);
        return res.status(500).json({ error: "Payment status failed" });
    }
};

module.exports = { initiatePayment, paymentStatus };
