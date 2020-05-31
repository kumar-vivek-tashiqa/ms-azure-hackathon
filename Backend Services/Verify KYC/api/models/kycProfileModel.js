"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var KYCProfileSchema = new Schema({
  uniqueUserId: {
    type: String,
    required: "Unique User ID from Azure AD B2C",
  },
  firstName: {
    type: String,
    required: "First name of the user",
  },
  lastName: {
    type: String,
    required: "Last name of the user",
  },
  emailId: {
    type: String,
    required: "Email ID of the user.",
  },
  phoneNumber: {
    type: String,
    required: "Phone number of the user.",
  },
  dateOfBirth: {
    type: Date,
    required: "Birth date of user.",
  },
  fathersFullName: {
    type: String,
    required: "Fathers name of the user.",
  },
  mothersFullName: {
    type: String,
    required: "Mothers name of the user.",
  },
  gender: {
    type: String,
    required: "Gender of the user.",
    enum: ["male", "female", "transgender"],
  },
  maritalStatus: {
    type: String,
    required: "Marital status of the user.",
    enum: ["married", "unmarried", "others"],
  },
  citizenship: {
    type: String,
    required: "Citizenship of the user.",
  },
  residentialStatus: {
    type: String,
    required: "Residential status of user.",
  },
  occupationType: {
    type: String,
    required: "Occupation type status of user.",
  },
  address: {
    addressLine1: {
      type: String,
      required: "Line 1 of user address",
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: "City of user address",
    },
    state: {
      type: String,
      required: "State of user address",
    },
    country: {
      type: String,
      required: "Country of user address",
    },
    zipCode: {
      type: String,
      required: "Zipcode of user address",
    },
    addressType: {
      type: String,
      required: "Address type of user address",
    },
  },
  panNumber: {
    type: String,
    required: "PAN number of user.",
  },
  proofOfAddress: {
    documentType: {
      type: String,
      required: "Type of document used for proof.",
      enum: ["passport", "driving licence"],
    },
    documentId: {
      type: String,
      required: "ID of the document used as proof.",
    },
    frontImageURL: {
      type: String,
      required: "Image url of front image.",
    },
    backImageURL: {
      type: String,
      required: "Image url of back image.",
    },
  },
  status: {
    type: String,
    required: "Status of the kyc verification.",
    enum: ["pending", "verified", "rejected", "outdated"],
  },
  comments: {
    type: String,
  },
  approvedAt: {
    type: Date,
  },
  blockChain: {
    type: Array,
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

module.exports = mongoose.model("KYCProfile", KYCProfileSchema);
