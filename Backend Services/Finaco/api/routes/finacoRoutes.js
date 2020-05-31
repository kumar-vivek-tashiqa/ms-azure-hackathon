"use strict";
module.exports = function(app) {
  const finaco = require("../controllers/finacoController");

  app.route("/").get(finaco.welcome);

  app.route("/api/ping").get(finaco.ping);

  app.route("/api/hackathon/sampleData").post(finaco.create_sample_data);

  app.route("/api/profile").post(finaco.create_profile);

  app.route("/api/profile").patch(finaco.update_profile);

  app.route("/api/profile/me").get(finaco.get_my_profile);

  app.route("/api/mutualFund").get(finaco.list_all_mutual_fund);

  app.route("/api/profile/transactions").post(finaco.create_transactions);

  app.route("/api/profile/transactions").get(finaco.get_transactions);

  app.route("/api/govt/profile/transactions").get(finaco.get_govt_transaction);

  app.route("/api/govt/profile/transactions/:userId").get(finaco.get_govt_transaction_by_id);

};