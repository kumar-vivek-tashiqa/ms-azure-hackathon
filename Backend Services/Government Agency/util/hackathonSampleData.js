const mongoose = require("mongoose");
Bank = mongoose.model("Bank");

module.exports = {
  onboardBank: function () {
    return new Promise(function (resolve, reject) {
      //Finaco Bank Data
      var newFinaco = new Bank({
        bankId: 101,
        bankName: "Finaco Bank",
        bankType: "private",
        bankInterface: "https://api-finacomutualfund.azurewebsites.net",
        bankInformation: {
          street: "#41 MG Road",
          zipcode: "560100",
          city: "Bangalore",
          country: "India",
          legalEntity: "pvt ltd",
          numberOfEmployees: "10000 - 50000",
        },
        status: "active",
      });

      //Frankin Bank Data
      var newFrankin = new Bank({
        bankId: 102,
        bankName: "Frankin Bank",
        bankType: "private",
        bankInterface: "https://api-frankinmutualfund.azurewebsites.net",
        bankInformation: {
          street: "#55 MG Road",
          zipcode: "560100",
          city: "Bangalore",
          country: "India",
          legalEntity: "pvt ltd",
          numberOfEmployees: "10000 - 50000",
        },
        status: "active",
      });

      //Onboard Finaco Bank [START]
      newFinaco.save(function (err, finacoResponseObject) {
        if (err) {
          console.log(err);
          reject("Unable to create the bank sample data.");
        } else {
          //Onboard Frankin Bank [START]
          newFrankin.save(function (err, frankinResponseObject) {
            if (err) {
              console.log(err);
              reject("Unable to create the bank sample data.");
            } else {
              resolve({
                message: "Successfully created the bank sample data.",
                finaco: finacoResponseObject,
                frankin: frankinResponseObject,
              });
            }
          }); //Onboard Frankin Bank [END]
        }
      }); //Onboard Finaco Bank [END]
    });
  }
};
