"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BankProfileSchema = new Schema({
  uniqueUserId: {
    type: String,
    required: "Unique user Id.",
  },
  kycID: {
    type: String,
    required: "KYC Id of User.",
  },
  totalBalance: {
    type: Number,
    required: "Total balance of user.",
  },
  availableBalance: {
    type: Number,
    required: "Available balance of user.",
  },
  lockedBalance: {
    type: Number,
    required: "locked balance of user.",
  },
  totalProfit: {
    type: Number,
    required: "Total profit of user.",
  },
  currentMonthProfit: {
    type: Number,
    required: "Current month profit of user.",
  },
  todayProfit: {
    type: Number,
    required: "Today profit of user.",
  },
  investedFunds: {
    type: Number,
    required: "Invested fund of user.",
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

module.exports = mongoose.model("BankProfile", BankProfileSchema);
