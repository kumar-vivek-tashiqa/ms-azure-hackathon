"use strict";
module.exports = function(app) {
  const frankin = require("../controllers/frankinController");

  app.route("/").get(frankin.welcome);

  app.route("/api/ping").get(frankin.ping);

  app.route("/api/hackathon/sampleData").post(frankin.create_sample_data);

  app.route("/api/profile").post(frankin.create_profile);

  app.route("/api/profile").patch(frankin.update_profile);

  app.route("/api/profile/me").get(frankin.get_my_profile);

  app.route("/api/mutualFund").get(frankin.list_all_mutual_fund);

  app.route("/api/profile/transactions").post(frankin.create_transactions);

  app.route("/api/profile/transactions").get(frankin.get_transactions);

  app.route("/api/govt/profile/transactions").get(frankin.get_govt_transaction);

  app.route("/api/govt/profile/transactions/:userId").get(frankin.get_govt_transaction_by_id);

};