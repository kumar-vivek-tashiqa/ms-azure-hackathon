const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const routes = require("./api/routes/verifyKYCRoutes");

app = express();

KYCProfile = require("./api/models/kycProfileModel");

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://' +
    process.env.mongo_db_service_username +
    ':' +
    process.env.mongo_db_service_password +
    '@' +
    process.env.mongo_db_endpoint+'/verifyKYC',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.raw({type: 'image/png', limit: '10mb'}));
app.use(bodyParser.raw({type: 'application/pdf', limit: '10mb'}));

app.use(
  "/api/swagger/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

routes(app);
module.exports = app;
