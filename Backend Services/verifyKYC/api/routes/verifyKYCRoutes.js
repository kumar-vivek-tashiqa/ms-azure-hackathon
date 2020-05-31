"use strict";
module.exports = function(app) {
  const verifyKyc = require("../controllers/verifyKYCController");

  app.route("/").get(verifyKyc.welcome);

  app.route("/api/ping").get(verifyKyc.ping);

  app.route("/api/kyc/profile").post(verifyKyc.create_my_kyc_profile);

  app.route("/api/kyc/profile").patch(verifyKyc.update_my_kyc_profile);

  app.route("/api/kyc/profile/me").get(verifyKyc.get_my_kyc_profile);

  app.route("/api/kyc/profile/all").get(verifyKyc.list_all_kyc_profile);

  app.route("/api/kyc/profile/user/:userId").get(verifyKyc.get_kyc_profile_by_id);

  app.route("/api/kyc/status/user/:kycId").patch(verifyKyc.update_kyc_status);

  app.route("/api/kyc/status/me").get(verifyKyc.get_my_kyc_status);

  app.route("/api/authentication").post(verifyKyc.authenticate);

  app.route("/api/authentication/verify").post(verifyKyc.verify);

  app.route("/api/uploadfile").post(verifyKyc.upload_file);
};