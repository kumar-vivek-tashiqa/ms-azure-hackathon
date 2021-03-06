const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const routes = require("./api/routes/governmentAgencyRoutes");

app = express();

Bank = require("./api/models/bankModel");
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://' +
    process.env.mongo_db_service_username +
    ':' +
    process.env.mongo_db_service_password +
    '@' +
    process.env.mongo_db_endpoint+':27017/governmentAgency',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/api/swagger/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

routes(app);
module.exports = app;
