"use strict";
const mongoose = require("mongoose");
const azureJWT = require("azure-jwt-verify");
const FileType = require("file-type");

const fs = require("fs");

const common = require("../../util/common");
const hackathonSampleData = require("../../util/hackathonSampleData");
const config = common.config();

const azure = require("azure-storage");
const blobService = azure.createBlobService();

const { v4: uuidv4 } = require("uuid");

KYCProfile = mongoose.model("KYCProfile");

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
      "This service is built for Microsoft Hackathon by Team Tashiqa. Please visit 'https://api-verifykyc.azurewebsites.net/api/swagger/api-docs' for viewing swagger definition of this service.",
  });
};

//Ping
exports.ping = function (req, res) {
  //This function can be called by anyone
  res.status(200).send({
    message: "Verify KYC service is up and running.",
  });
};

//Create My KYC Profile
exports.create_my_kyc_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (
      req.body.phoneNumber &&
      req.body.dateOfBirth &&
      req.body.fathersFullName &&
      req.body.mothersFullName &&
      req.body.gender &&
      req.body.maritalStatus &&
      req.body.citizenship &&
      req.body.residentialStatus &&
      req.body.occupationType &&
      req.body.address.addressLine1 &&
      req.body.address.city &&
      req.body.address.state &&
      req.body.address.country &&
      req.body.address.zipCode &&
      req.body.address.addressType &&
      req.body.panNumber &&
      req.body.proofOfAddress.documentType &&
      req.body.proofOfAddress.documentId &&
      req.body.proofOfAddress.frontImageURL &&
      req.body.proofOfAddress.backImageURL &&
      req.body.status
    ) {
      azureJWT
        .verify(
          req.headers["authorization"].replace("Bearer ", ""),
          adConfigWithoutAudience
        )
        .then(
          function (decoded) {
            decoded = JSON.parse(decoded);
            if (decoded.status == "success") {
              KYCProfile.find(
                {
                  uniqueUserId: decoded.message.sub,
                },
                function (err, kycprofilearray) {
                  if (!err) {
                    if (kycprofilearray.length >= 1) {
                      res
                        .status(400)
                        .send({ message: "KYC profile already exist." });
                    } else {
                      //Create KYC profile object
                      var newKYCProfile = new KYCProfile({
                        uniqueUserId: decoded.message.sub,
                        firstName: decoded.message.extension_Firstname,
                        lastName: decoded.message.extension_Lastname,
                        emailId: decoded.message.emails[0],
                        phoneNumber: req.body.phoneNumber,
                        dateOfBirth: req.body.dateOfBirth,
                        fathersFullName: req.body.fathersFullName,
                        mothersFullName: req.body.mothersFullName,
                        gender: req.body.gender,
                        maritalStatus: req.body.maritalStatus,
                        citizenship: req.body.citizenship,
                        residentialStatus: req.body.residentialStatus,
                        occupationType: req.body.occupationType,
                        address: {
                          addressLine1: req.body.address.addressLine1,
                          addressLine2: req.body.address.addressLine2,
                          city: req.body.address.city,
                          state: req.body.address.state,
                          country: req.body.address.country,
                          zipCode: req.body.address.zipCode,
                          addressType: req.body.address.addressType,
                        },
                        panNumber: req.body.panNumber,
                        proofOfAddress: {
                          documentType: req.body.proofOfAddress.documentType,
                          documentId: req.body.proofOfAddress.documentId,
                          frontImageURL: req.body.proofOfAddress.frontImageURL,
                          backImageURL: req.body.proofOfAddress.backImageURL,
                        },
                        status: req.body.status,
                        comments: req.body.comments,
                      });

                      newKYCProfile.save(function (err, kycProfile) {
                        if (err) {
                          res.status(500).send({
                            message: err,
                          });
                        } else {
                          res.status(200).send({
                            message: "KYC profile created.",
                            profileInformation: kycProfile,
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

//Update my kcy profile
exports.update_my_kyc_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    if (
      req.body._id &&
      req.body.phoneNumber &&
      req.body.dateOfBirth &&
      req.body.fathersFullName &&
      req.body.mothersFullName &&
      req.body.gender &&
      req.body.maritalStatus &&
      req.body.citizenship &&
      req.body.residentialStatus &&
      req.body.occupationType &&
      req.body.address.addressLine1 &&
      req.body.address.city &&
      req.body.address.state &&
      req.body.address.country &&
      req.body.address.zipCode &&
      req.body.address.addressType &&
      req.body.panNumber &&
      req.body.proofOfAddress.documentType &&
      req.body.proofOfAddress.documentId &&
      req.body.proofOfAddress.frontImageURL &&
      req.body.proofOfAddress.backImageURL &&
      req.body.status
    ) {
      azureJWT
        .verify(
          req.headers["authorization"].replace("Bearer ", ""),
          adConfigWithoutAudience
        )
        .then(
          function (decoded) {
            decoded = JSON.parse(decoded);
            if (decoded.status == "success") {
              KYCProfile.find(
                {
                  uniqueUserId: decoded.message.sub,
                },
                function (err, kycprofilearray) {
                  if (!err) {
                    if (kycprofilearray.length < 1) {
                      res
                        .status(400)
                        .send({ message: "KYC profile doesn't exist." });
                    } else {
                      KYCProfile.find(
                        {
                          _id: req.params._id,
                        },
                        function (err, kycList) {
                          if (kycList.length == 1) {
                            //Update KYC Document
                            KYCProfile.findOneAndUpdate(
                              { _id: req.params.kycId },
                              req.body,
                              { upsert: true },
                              function (err, doc) {
                                if (!err) {
                                  res
                                    .status(200)
                                    .send({ message: "KYC Updated." });
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
                              .send({ message: "KYC profile doesn't exist." });
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

//Get My KYC Status
exports.get_my_kyc_status = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    azureJWT
      .verify(
        req.headers["authorization"].replace("Bearer ", ""),
        adConfigWithoutAudience
      )
      .then(
        function (decoded) {
          decoded = JSON.parse(decoded);
          if (decoded.status == "success") {
            KYCProfile.find(
              {
                uniqueUserId: decoded.message.sub,
              },
              function (err, kycprofilearray) {
                if (!err) {
                  if (kycprofilearray.length != 1) {
                    res
                      .status(400)
                      .send({ message: "KYC profile doesn't exist." });
                  } else {
                    KYCProfile.find(
                      {
                        uniqueUserId: decoded.message.sub,
                      },
                      function (err, kycList) {
                        if (kycList.length == 1) {
                          res.status(200).send({
                            uniqueUserId: decoded.message.sub,
                            status: kycList[0].status,
                          });
                        } else {
                          res
                            .status(400)
                            .send({ message: "KYC profile doesn't exist." });
                        }
                      }
                    );
                  }
                } else {
                  res.status(400).send({
                    message: "Backend services un-available.",
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

//Get My KYC Profile
exports.get_my_kyc_profile = function (req, res) {
  //This function can be called with a valid JWT Token
  if (req.headers["authorization"]) {
    azureJWT
      .verify(
        req.headers["authorization"].replace("Bearer ", ""),
        adConfigWithoutAudience
      )
      .then(
        function (decoded) {
          decoded = JSON.parse(decoded);
          if (decoded.status == "success") {
            KYCProfile.find(
              {
                uniqueUserId: decoded.message.sub,
              },
              function (err, kycprofilearray) {
                if (!err) {
                  if (kycprofilearray.length != 1) {
                    res
                      .status(400)
                      .send({ message: "KYC profile doesn't exist." });
                  } else {
                    KYCProfile.find(
                      {
                        uniqueUserId: decoded.message.sub,
                      },
                      function (err, kycList) {
                        if (kycList.length == 1) {
                          res.status(200).send(kycList[0]);
                        } else {
                          res
                            .status(400)
                            .send({ message: "KYC profile doesn't exist." });
                        }
                      }
                    );
                  }
                } else {
                  res.status(400).send({
                    message: "Backend services un-available.",
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

//Verify KYC authentication - for hackathon a complete user control was not implemented for Verify KYC
exports.authenticate = function (req, res) {
  if (req.body.username && req.body.password) {
    if (
      req.body.username == process.env.verify_kyc_username &&
      req.body.password == process.env.verify_kyc_password
    ) {
      return res.status(200).send({
        message: "Authentication successful",
        base64Key: process.env.verify_kyc_base64Key,
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

//Update KYC Status
exports.update_kyc_status = function (req, res) {
  if (req.headers["authorization"]) {
    if (req.headers["authorization"] == process.env.verify_kyc_base64Key) {
      if (
        req.params.kycId &&
        req.body.status &&
        req.body.comments &&
        req.body.updatedAt
      ) {
        var transaction = Promise.resolve(
          hackathonSampleData.createKYCTransaction()
        );

        Promise.all([transaction]).then(function (values) {
          var query;

          if (req.body.status == "verified") {
            query = {
              status: req.body.status,
              comments: req.body.comments,
              updatedAt: req.body.updatedAt,
              approvedAt: req.body.approvedAt,
              blockChain: values[0],
            };
          } else {
            query = {
              status: req.body.status,
              comments: req.body.comments,
              updatedAt: req.body.updatedAt,
            };
          }

          KYCProfile.find(
            {
              _id: req.params.kycId,
            },
            function (err, kycList) {
              if (kycList.length == 1) {
                //Update KYC Document
                KYCProfile.findOneAndUpdate(
                  { _id: req.params.kycId },
                  query,
                  { upsert: true },
                  function (err, doc) {
                    if (!err) {
                      res
                        .status(200)
                        .send({ message: "Transaction completed." });
                    } else {
                      res
                        .status(400)
                        .send({ message: "Unable to perform DB transaction." });
                    }
                  }
                );
              } else {
                res.status(400).send({ message: "KYC profile doesn't exist." });
              }
            }
          );
        });
      } else {
        res.status(400).send({
          message: "Invalid body format.",
        });
      }
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

//List all kyc profile
exports.list_all_kyc_profile = function (req, res) {
  if (req.headers["authorization"]) {
    if (
      req.headers["authorization"] == process.env.verify_kyc_base64Key ||
      req.headers["authorization"] == process.env.government_base64Key
    ) {
      var query;

      if (req.query.status) {
        query = { status: req.query.status };

        KYCProfile.find(query, function (err, kycList) {
          if (!err) {
            res.status(200).send(kycList);
          } else {
            res
              .status(400)
              .send({ message: "Unable to perform DB transaction." });
          }
        });
      } else {
        query = {};

        KYCProfile.find(query, function (err, kycList) {
          if (!err) {
            console.log(query);
            res.status(200).send(kycList);
          } else {
            res
              .status(400)
              .send({ message: "Unable to perform DB transaction." });
          }
        });
      }
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

//Get KYC by ID
exports.get_kyc_profile_by_id = function (req, res) {
  if (req.headers["authorization"]) {
    if (
      req.headers["authorization"] == process.env.verify_kyc_base64Key ||
      req.headers["authorization"] == process.env.government_base64Key
    ) {
      if (req.params.userId) {
        KYCProfile.find(
          {
            uniqueUserId: req.params.userId,
          },
          function (err, kycList) {
            if (kycList.length == 1) {
              res.status(200).send(kycList[0]);
            } else {
              res.status(400).send({ message: "KYC profile doesn't exist." });
            }
          }
        );
      } else {
        res.status(400).send({
          message: "Invalid body format.",
        });
      }
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

//Upload file
exports.upload_file = function (req, res) {
  //This function can be called by anyone

  var file = req.body;

  if (file && Object.keys(file).length > 0) {
    (async () => {
      var fileExtension = await FileType.fromBuffer(file);
      var fileName = uuidv4() + "." + fileExtension.ext;

      fs.writeFile("test", file, function (err) {
        if (err) {
          return console.log(err);
        }
        blobService.createBlockBlobFromLocalFile(
          "verification",
          fileName,
          "test",
          function (error, result, response) {
            if (!error) {
              res.status(200).send({
                containerTransaction: result,
                fileMeta: response.headers,
                downloadPath:
                  "https://verifykycdocuments.blob.core.windows.net/" +
                  result.container +
                  "/" +
                  result.name,
              });
            } else {
              res.status(400).send({
                messgae: "Unable to process your request at the moment.",
              });
            }
          }
        );
      });
    })();
  } else {
    res.status(400).send({
      message:
        "Invalid file format only PDF documents and PNG are allowed, please check the file uploaded and try again.",
    });
  }
};

//Verify
exports.verify = function (req, res) {
  if (req.headers["authorization"]) {
    if (req.headers["authorization"] == process.env.verify_kyc_base64Key) {
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
