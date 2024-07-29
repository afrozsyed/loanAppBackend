# Documentation for loan management

## create a loan for new customer
this api will create a loan for the new customer 
the client have to send the customer, vehicle and loan details in the single api and will save the loan details.

request type: POST
request URI: /api/v1/loan-mgmt/create-newcust-loan

### sample request
```
{
  "customer": {
    "name": "test customer",
    "phoneNumber": "1234567890",
    "email": "cust@gmail.com",
    "address": "124-4 telangana",
    "dateOfBirth": "01-01-1993",
    "gender":"Male",
    "aadharNumber":"147852145698"
  },
  "vehicle": {
    "vehicleType": "Car",
    "model": "Toyota Corolla",
    "engineNumber": "ABC123456789",
    "chassisNumber": "XYZ987654321",
    "vehicleNumber": "XYZ1234",
    "insurance": "ABC Insurance"
  },
  "loan": {
    "principalAmount": 10000,
    "interestRate": 10,
    "tenure": 24,
    "guarantorName":"guarantor_test",
    "guarantorPhoneNumber":"1452369874",
    "guarantorAddress":"guarantorAddress test",
    "guarantorAadharNumber":"123652145236"
  }
}
```

### sample response
```
{
    "status": {
        "code": 200,
        "message": "loan created successfully ",
        "type": "success"
    },
    "data": {
        "accountNumber": "29",
        "customer": "66a71233698d7da9547d875c",
        "vehicle": "66a71233698d7da9547d875f",
        "principalAmount": 10000,
        "interestRate": 10,
        "tenure": 24,
        "startDate": "2024-07-29T03:53:23.774Z",
        "emiAmount": 461.44926337516654,
        "guarantorName": "guarantor_test",
        "guarantorPhoneNumber": "1452369874",
        "guarantorAddress": "guarantorAddress test",
        "guarantorAadharNumber": "123652145236",
        "status": "active",
        "_id": "66a71233698d7da9547d8762",
        "createdAt": "2024-07-29T03:53:23.777Z",
        "updatedAt": "2024-07-29T03:53:23.777Z",
        "__v": 0
    }
}
```