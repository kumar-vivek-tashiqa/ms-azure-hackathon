"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BankSchema = new Schema({
  bankId: {
    type: Number,
    required: "Unique bankID",
  },
  bankName: {
    type: String,
    required: "Name of the bank.",
  },
  bankType: {
    type: String,
    enum: ["public", "private"],
    required: "Type of bank either public or private.",
  },
  bankInterface: {
    type: String,
    required: "Bank interface url.",
  },
  bankInformation: {
    street: {
      type: String,
      required: "Name of the street for bank HQ.",
    },
    zipcode: {
      type: String,
      required: "Zipcode of place for bank HQ.",
    },
    city: {
      type: String,
      required: "City for bank HQ.",
    },
    country: {
      type: String,
      required: "Country for bank HQ.",
    },
    legalEntity: {
      type: String,
      enum: ["pvt ltd", "corporation"],
      required: "Legal engity name of the bank.",
    },
    numberOfEmployees: {
      type: String,
      required: "Number of employees in the bank.",
    },
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

module.exports = mongoose.model("Bank", BankSchema);
