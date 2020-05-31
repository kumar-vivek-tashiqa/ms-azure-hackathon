"use strict";
const unirest = require("unirest");
const mongoose = require("mongoose");
const hackathonSampleData = require("../../util/hackathonSampleData");

Bank = mongoose.model("Bank");

//Welcome
exports.welcome = function (req, res) {
  //This function can be called by anyone
  res.status(200).send({
    message:
      "This service is built for Microsoft Hackathon by Team Tashiqa. Please visit 'https://api-governmentagency.azurewebsites.net/api/swagger/api-docs' for viewing swagger definition of this service.",
  });
};

//Ping
exports.ping = function (req, res) {
  //This function can be called by anyone
  res.status(200).send({
    message: "Government agency service is up and running.",
  });
};

//This function creates sample data to get started for hackathon - like onboarding banks
exports.create_sample_data = function (req, res) {
  //Check if data already exists
  Bank.find({}, function (err, banks) {
    if (!err) {
      if (banks.length >= 2) {
        res.status(400).send({ message: "Sample data already available." });
      } else {
        //Create entry if no data available
        var sampleBankData = Promise.resolve(hackathonSampleData.onboardBank());

        Promise.all([sampleBankData])
          .then(function (values) {
            res.status(200).send({
              response: values[0],
            });
          })
          .catch((error) => {
            res.status(400).send({
              error: error,
            });
          });
      }
    } else {
      res.status(400).send({
        message: "Unable to perform the query, check database connectivity.",
      });
    }
  });
};

//Govt bodies authentication - for hackathon a complete user control was not implemented for Govt bodies
exports.authenticate = function (req, res) {
  if (req.body.username && req.body.password) {
    if (
      req.body.username == process.env.government_username &&
      req.body.password == process.env.government_password
    ) {
      return res.status(200).send({
        message: "Authentication successful",
        base64Key: process.env.government_base64Key,
      });
    } else {
      return res.status(401).send({
        message:
          "Inavlid username or password, please try again with a valid credentials.",
      });
    }
  } else {
    //Unexpected request body
    return res.status(400).send({
      message: "Inavlid body format.",
    });
  }
};

//List all banks
exports.get_bank_list = function (req, res) {
  //This function need basic authentication
  if (req.headers["authorization"]) {
    if (req.headers["authorization"] == process.env.government_base64Key) {
      Bank.find({}, function (err, banks) {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          return res.status(200).send(banks);
        }
      });
    } else {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).send({
      message: "Basic authentication missing.",
    });
  }
};

//List bank by ID
exports.get_bank_list_by_id = function (req, res) {
  //This function need basic authentication
  if (req.params.bankId) {
    if (req.headers["authorization"]) {
      if (req.headers["authorization"] == process.env.government_base64Key) {
        Bank.find({ bankId: req.params.bankId }, function (err, banks) {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            return res.status(200).send(banks[0]);
          }
        });
      } else {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }
    } else {
      return res.status(401).send({
        message: "Basic authentication missing.",
      });
    }
  } else {
    return res.status(400).send({
      message: "Inavlid body format.",
    });
  }
};

//Verify
exports.verify = function (req, res) {
  if (req.headers["authorization"]) {
    if (req.headers["authorization"] == process.env.government_base64Key) {
      res.status(200).send("Valid");
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
