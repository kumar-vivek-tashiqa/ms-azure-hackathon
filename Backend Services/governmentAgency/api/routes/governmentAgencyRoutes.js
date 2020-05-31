"use strict";
module.exports = function(app) {
  const governmentAgency = require("../controllers/governmentAgencyController");

  app.route("/").get(governmentAgency.welcome);

  app.route("/api/ping").get(governmentAgency.ping);

  app.route("/api/hackathon/sampleData").post(governmentAgency.create_sample_data);

  app.route("/api/authentication").post(governmentAgency.authenticate);

  app.route("/api/banks").get(governmentAgency.get_bank_list);

  app.route("/api/banks/:bankId").get(governmentAgency.get_bank_list_by_id);

  app.route("/api/authentication/verify").post(governmentAgency.verify);
};