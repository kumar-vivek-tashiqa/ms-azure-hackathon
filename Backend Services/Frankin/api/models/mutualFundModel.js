"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MutualFundSchema = new Schema({
  exchange: {
    type: String,
    required: "Exchange for mutual fund.",
  },
  amcName: {
    type: String,
    required: "AMC name for mutual fund.",
  },
  fundCategory: {
    type: String,
    required: "Fund category for mutual fund.",
  },
  ISIN: {
    type: String,
    required: "ISIN for mutual fund.",
  },
  schemeID: {
    type: String,
    required: "Schema id for mutual fund.",
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
  rating: {
    type: String,
    required: "Rating for mutual fund.",
  },
  nav: {
    type: String,
    required: "NAV for mutual fund.",
  },
  aum: {
    type: String,
    required: "AUM for mutual fund.",
  },
  risk: {
    type: String,
    required: "Risk for mutual fund.",
    enum: ["low", "moderate", "high"],
  },
  oneYrReturns: {
    type: String,
    required: "One year return for mutual fund.",
  },
  threeYrReturns: {
    type: String,
    required: "Three year return for mutual fund.",
  },
  fiveYrReturns: {
    type: String,
    required: "Five year return for mutual fund.",
  },
  cgar: {
    type: String,
    required: "CGAR for mutual fund.",
  },
  minimumAmount: {
    type: Number,
    required: "Minimum amount for mutual fund.",
  },
  termMonth: {
    type: Number,
    required: "Minimum amount for mutual fund.",
  },
  status: {
    type: String,
    required: "Current status of the bank.",
    enum: ["active", "inactive"],
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

module.exports = mongoose.model("MutualFund", MutualFundSchema);
