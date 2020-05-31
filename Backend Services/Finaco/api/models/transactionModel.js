"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  uniqueUserId: {
    type: String,
    required: "Unique user Id.",
  },
  blockChain: {
    type: Array,
  },
  schemeID: {
    type: String,
    required: "Schema id for mutual fund.",
  },
  transactionType: {
    type: String,
    required: "Transaction type.",
  },
  schemeName: {
    type: String,
    required: "Schema name for mutual fund.",
  },
  fundDescription: {
    type: String,
    required: "Fund description for mutual fund.",
  },
  category: {
    type: String,
    required: "Category for mutual fund.",
  },
  paymentMethod: {
    type: String,
    required: "Payment method is mandatory required.",
  },
  price: {
    type: Number,
    required: "Price for mutual fund.",
  },
  quantity: {
    type: Number,
    required: "Quantity for mutual fund.",
  },
  amount: {
    type: Number,
    required: "Amount for mutual fund.",
  },
  subTotal: {
    type: Number,
    required: "Sub total for mutual fund.",
  },
  processingFee: {
    type: Number,
    required: "Processing fee for mutual fund.",
  },
  tax: {
    type: String,
    required: "Tax for mutual fund.",
  },
  brokerage: {
    type: Number,
    required: "Brokerage for mutual fund.",
  },
  grandTotal: {
    type: Number,
    required: "Grand total for mutual fund.",
  },
  status: {
    type: String,
    required: "Current status of the bank.",
    enum: ["active", "inactive"],
  },
  paymentFrom: {
    type: String,
    required: "Payment form mutual fund.",
  },
  paymentTo: {
    type: String,
    required: "Payment to mutual fund.",
  },
  details: {
    type: String,
    required: "Details for mutual fund.",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
