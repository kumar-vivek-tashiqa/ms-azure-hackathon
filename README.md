# Decentralized Fund Management Platform

This repository contains code for backend services and frontend app for the purpose of Microsoft Azure Hackathon.

## Technology

- HTML, JS, CSS, Bootstrap and JQuery
- NodeJS, Express and MongoDB
- Azure App Services, Storage Accounts, Azure AD B2C, Azure Blockchain Services, Logic Apps and Azure Virtual Machines

## Swagger

Swagger definition is available at `/api/swagger/api-docs` on your hosted environment. For the purpose of hackathon sample services are already running Azure.

- Finaco Swagger API [Bank 1]
https://api-finacomutualfund.azurewebsites.net/api/swagger/api-docs/

- Frankin Swagger API [Bank 2]
https://api-frankinmutualfund.azurewebsites.net/api/swagger/api-docs/

- Verify KYC [3rd Party Agency]
https://api-verifykyc.azurewebsites.net/api/swagger/api-docs/

- Government [Government Bodies]
https://api-governmentagency.azurewebsites.net/api/swagger/api-docs/


## How to run

Below steps cover what are the steps to run these services

### Backend Services

* Clone the repository which you want to run locally or deploy on Azure App Service.

* Create databases in mongoDB and create a service account so backend services can access the DB.
  - finacoMutualFund
  - frankinMutualFund
  - governmentagency
  - verifyKYC
  
* Set environment variables for local machine or set secrets/configurations while running in App Services based on the app.
  
  [FINACO MUTUAL FUND]
  - mongo_db_endpoint
  - mongo_db_port
  -	mongo_db_service_password
  - mongo_db_service_username
  
  [FRANKIN MUTUAL FUND]
  - mongo_db_endpoint
  - mongo_db_port
  -	mongo_db_service_password
  - mongo_db_service_username

  [GOVERNMENT AGENCY]
  - mongo_db_endpoint
  - mongo_db_port
  -	mongo_db_service_password
  - mongo_db_service_username
  
  [VERIFY KYC]
  - mongo_db_endpoint
  - mongo_db_port
  -	mongo_db_service_password
  - mongo_db_service_username
  - AZURE_STORAGE_CONNECTION_STRING //YOUR_STORAGE_ACCOUNT_CONNECTION_STRING

* Deploy to Azure App Service Plan

[LOCAL ONLY]
* Install dependency with `npm install` 
* Run node service with `npm start`
* Visit `hostedURL:1337`, the service should prompt healthy service response.

### Frontend App

* Clone the folder in repository which you want to deploy.
* Use Azure DevOps pipeline or manually push the source files to Azure Storage Account of your choice.