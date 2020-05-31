"use strict";
const unirest = require("unirest");
const mongoose = require("mongoose");
const hackathonSampleData = require("../../util/hackathonSampleData");
const azureJWT = require("azure-jwt-verify");

const common = require("../../util/common");
const config = common.config();

MutualFund = mongoose.model("MutualFund");
BankProfile = mongoose.model("BankProfile");
Transaction = mongoose.model("Transaction");

//Initializing AD Configuration
const adConfigWithAudience = {
  JWK_URI: config.adTenantInformation.JWK_URI,
  ISS: config.adTenantInformation.ISS,
  AUD: config.adTenantInformation.AUD,
};

//Initializing AD Configuration
const adConfigWithoutAudience = {
  JWK_URI: config.adTenantInformation.JWK_URI,
  ISS: config.adTenantInformation.ISS,
};

//Welcome
exports.welcome = function (req, res) {
  //This function can be called by anyone
  res.status(200).send({
    message:
      "This service is built for Microsoft Hackathon by Team Tashiqa. Please visit 'https://api-finacomutualfund.azurewebsites.net/api/swagger/api-docs' for viewing swagger definition of this service.",
  });
};

//Ping
exports.ping = function (req, res) {
  //This function can be called by anyone
  res.status(200).send({
    message: "Finaco service is up and running.",
  });
};

//This function creates sample data to get started for hackathon - like onboarding mutualfund
exports.create_sample_data = function (req, res) {
  //Check if data already exists
  MutualFund.find({}, function (err, mutualfund) {
    if (!err) {
      if (mutualfund.length >= 10) {
        res.status(400).send({ message: "Sample data already available." });
      } else {
        //Create entry if no data available
        var sampleMutualData = Promise.resolve(
          hackathonSampleData.onboardMutualFund()
        );

        Promise.all([sampleMutualData])
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

//Create bank profile
exports.create_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (
      req.body.kycID &&
      req.body.totalBalance &&
      req.body.availableBalance &&
      req.body.lockedBalance &&
      req.body.totalProfit &&
      req.body.currentMonthProfit &&
      req.body.todayProfit &&
      req.body.investedFunds
    ) {
      azureJWT
        .verify(
          req.headers["authorization"].replace("Bearer ", ""),
          adConfigWithAudience
        )
        .then(
          function (decoded) {
            decoded = JSON.parse(decoded);
            if (decoded.status == "success") {
              BankProfile.find(
                {
                  uniqueUserId: decoded.message.sub,
                },
                function (err, bankprofilearray) {
                  if (!err) {
                    if (bankprofilearray.length >= 1) {
                      res
                        .status(400)
                        .send({ message: "User profile already exist." });
                    } else {
                      //Create user profile object
                      var newUserProfile = new BankProfile({
                        uniqueUserId: decoded.message.sub,
                        kycID: req.body.kycID,
                        totalBalance: req.body.totalBalance,
                        availableBalance: req.body.availableBalance,
                        lockedBalance: req.body.lockedBalance,
                        totalProfit: req.body.totalProfit,
                        currentMonthProfit: req.body.currentMonthProfit,
                        todayProfit: req.body.todayProfit,
                        investedFunds: req.body.investedFunds,
                      });

                      newUserProfile.save(function (err, userProfile) {
                        if (err) {
                          res.status(500).send({
                            message: err,
                          });
                        } else {
                          res.status(200).send({
                            message: "User profile created.",
                            profileInformation: userProfile,
                          });
                        }
                      });
                    }
                  } else {
                    res.status(401).send({
                      message: "Unauthorized.",
                    });
                  }
                }
              );
            } else {
              res.status(401).send({
                message: "Unauthorized.",
              });
            }
          },
          function (error) {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        );
    } else {
      return res.status(400).send({
        message: "Inavlid body format.",
      });
    }
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Update my user profile
exports.update_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (
      req.body.kycID &&
      req.body.totalBalance &&
      req.body.availableBalance &&
      req.body.lockedBalance &&
      req.body.totalProfit &&
      req.body.currentMonthProfit &&
      req.body.todayProfit &&
      req.body.investedFunds
    ) {
      azureJWT
        .verify(
          req.headers["authorization"].replace("Bearer ", ""),
          adConfigWithAudience
        )
        .then(
          function (decoded) {
            decoded = JSON.parse(decoded);
            if (decoded.status == "success") {
              BankProfile.find(
                {
                  uniqueUserId: decoded.message.sub,
                },
                function (err, userprofilearray) {
                  if (!err) {
                    if (userprofilearray.length < 1) {
                      res
                        .status(400)
                        .send({ message: "User profile doesn't exist." });
                    } else {
                      BankProfile.find(
                        {
                          uniqueUserId: decoded.message.sub,
                        },
                        function (err, kycList) {
                          if (kycList.length == 1) {
                            //Update User Document
                            BankProfile.findOneAndUpdate(
                              { uniqueUserId: decoded.message.sub },
                              req.body,
                              { upsert: true },
                              function (err, doc) {
                                if (!err) {
                                  res
                                    .status(200)
                                    .send({ message: "User updated." });
                                } else {
                                  res.status(400).send({
                                    message:
                                      "Unable to perform DB transaction.",
                                  });
                                }
                              }
                            );
                          } else {
                            res
                              .status(400)
                              .send({ message: "User profile doesn't exist." });
                          }
                        }
                      );
                    }
                  } else {
                    res.status(401).send({
                      message: "Unauthorized.",
                    });
                  }
                }
              );
            } else {
              res.status(401).send({
                message: "Unauthorized.",
              });
            }
          },
          function (error) {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        );
    } else {
      return res.status(400).send({
        message: "Inavlid body format.",
      });
    }
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Get my profile
exports.get_my_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    azureJWT
      .verify(
        req.headers["authorization"].replace("Bearer ", ""),
        adConfigWithAudience
      )
      .then(
        function (decoded) {
          decoded = JSON.parse(decoded);
          if (decoded.status == "success") {
            BankProfile.find(
              {
                uniqueUserId: decoded.message.sub,
              },
              function (err, userprofilearray) {
                if (!err) {
                  if (userprofilearray.length < 1) {
                    res
                      .status(400)
                      .send({ message: "User profile doesn't exist." });
                  } else {
                    res.status(200).send(userprofilearray[0]);
                  }
                } else {
                  res.status(401).send({
                    message: "Unauthorized.",
                  });
                }
              }
            );
          } else {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        },
        function (error) {
          res.status(401).send({
            message: "Unauthorized.",
          });
        }
      );
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//List all mutual funds
exports.list_all_mutual_fund = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    azureJWT
      .verify(
        req.headers["authorization"].replace("Bearer ", ""),
        adConfigWithAudience
      )
      .then(
        function (decoded) {
          decoded = JSON.parse(decoded);
          if (decoded.status == "success") {
            MutualFund.find({}, function (err, listOfFunds) {
              if (!err) {
                if (listOfFunds.length < 1) {
                  res.status(400).send({ message: "Funds don't exists." });
                } else {
                  res.status(200).send(listOfFunds);
                }
              } else {
                res.status(401).send({
                  message: "Unauthorized.",
                });
              }
            });
          } else {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        },
        function (error) {
          res.status(401).send({
            message: "Unauthorized.",
          });
        }
      );
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Create transactions
exports.create_transactions = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (
      req.body.schemeID &&
      req.body.transactionType &&
      req.body.schemeName &&
      req.body.fundDescription &&
      req.body.category &&
      req.body.paymentMethod &&
      req.body.price &&
      req.body.quantity &&
      req.body.amount &&
      req.body.subTotal &&
      req.body.processingFee &&
      req.body.tax &&
      req.body.brokerage &&
      req.body.grandTotal &&
      req.body.status &&
      req.body.paymentFrom &&
      req.body.paymentTo &&
      req.body.details
    ) {
      azureJWT
        .verify(
          req.headers["authorization"].replace("Bearer ", ""),
          adConfigWithAudience
        )
        .then(
          function (decoded) {
            decoded = JSON.parse(decoded);
            if (decoded.status == "success") {
              
              var transaction = Promise.resolve(
                hackathonSampleData.createSampleTransaction()
              );

              Promise.all([transaction])
                .then(function (values) {

                  var newTransaction = new Transaction({
                    uniqueUserId: decoded.message.sub,
                    schemeID: req.body.schemeID,
                    blockChain: values[0],
                    transactionType: req.body.transactionType,
                    schemeName: req.body.schemeName,
                    fundDescription: req.body.fundDescription,
                    category: req.body.category,
                    paymentMethod: req.body.paymentMethod,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    amount: req.body.amount,
                    subTotal: req.body.subTotal,
                    processingFee: req.body.processingFee,
                    tax: req.body.tax,
                    brokerage: req.body.brokerage,
                    grandTotal: req.body.grandTotal,
                    status: req.body.status,
                    paymentFrom: req.body.paymentFrom,
                    paymentTo: req.body.paymentTo,
                    details: req.body.details
                  });


                  newTransaction.save(function (err, userTransaction) {
                    if (err) {
                      res.status(500).send({
                        message: err,
                      });
                    } else {
                      res.status(200).send({
                        message: "User transaction created.",
                        profileInformation: userTransaction,
                      });
                    }
                  });
                })
                .catch((error) => {
                  res.status(400).send({
                    error: error,
                  });
                });
            } else {
              res.status(401).send({
                message: "Unauthorized.",
              });
            }
          },
          function (error) {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        );
    } else {
      return res.status(400).send({
        message: "Inavlid body format.",
      });
    }
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Get user transactions
exports.get_transactions = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    azureJWT
      .verify(
        req.headers["authorization"].replace("Bearer ", ""),
        adConfigWithAudience
      )
      .then(
        function (decoded) {
          decoded = JSON.parse(decoded);
          if (decoded.status == "success") {
            Transaction.find(
              {
                uniqueUserId: decoded.message.sub,
              },
              function (err, usertransactionarray) {
                if (!err) {
                  if (usertransactionarray.length < 1) {
                    res
                      .status(400)
                      .send({ message: "User transactions doesn't exist." });
                  } else {
                    res.status(200).send(usertransactionarray);
                  }
                } else {
                  res.status(401).send({
                    message: "Unauthorized.",
                  });
                }
              }
            );
          } else {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        },
        function (error) {
          res.status(401).send({
            message: "Unauthorized.",
          });
        }
      );
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Get user transactions by Govt
exports.get_govt_transaction_by_id = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"] && req.params.userId) {
    if (req.headers["authorization"] == process.env.government_base64Key) {
      Transaction.find(
        {
          uniqueUserId: req.params.userId,
        },
        function (err, usertransactionarray) {
          if (!err) {
            if (usertransactionarray.length < 1) {
              res
                .status(400)
                .send({ message: "User transactions doesn't exist." });
            } else {
              res.status(200).send(usertransactionarray);
            }
          } else {
            res.status(401).send({
              message: "Unauthorized.",
            });
          }
        }
      );
    } else {
      res.status(401).send({
        message: "Unauthorized.",
      });
    }
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};

//Get user transactions by Govt
exports.get_govt_transaction = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (req.headers["authorization"] == process.env.government_base64Key) {
      Transaction.find({}, function (err, usertransactionarray) {
        if (!err) {
          if (usertransactionarray.length < 1) {
            res
              .status(400)
              .send({ message: "User transactions doesn't exist." });
          } else {
            res.status(200).send(usertransactionarray);
          }
        } else {
          res.status(401).send({
            message: "Unauthorized.",
          });
        }
      });
    } else {
      res.status(401).send({
        message: "Unauthorized.",
      });
    }
  } else {
    res.status(401).send({
      message: "Missing JWT token.",
    });
  }
};