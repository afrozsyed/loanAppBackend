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
        "accountNumber": "30",
        "customer": "66a737714c22b64bbb51ef03",
        "vehicle": "66a737714c22b64bbb51ef06",
        "principalAmount": 10000,
        "outstandingPrincipal": 10000,
        "interestRate": 10,
        "actualTenure": 24,
        "tenure": 24,
        "startDate": "2024-07-29T06:32:17.789Z",
        "emiAmount": 461.44926337516654,
        "lastPaymentDate": null,
        "nextPaymentDate": "2024-08-29T06:32:17.785Z",
        "paidEMIs": 0,
        "guarantorName": "guarantor_test",
        "guarantorPhoneNumber": "1452369874",
        "guarantorAddress": "guarantorAddress test",
        "guarantorAadharNumber": "123652145236",
        "status": "active",
        "_id": "66a737714c22b64bbb51ef09",
        "createdAt": "2024-07-29T06:32:17.791Z",
        "updatedAt": "2024-07-29T06:32:17.791Z",
        "__v": 0
    }
}
```


## update the Outstanding amount 
update the Outstanding amount as per the intrest per day. so that the amount can be recalculated,

this should be called as a backend job or a click per month or day so that the outstanding amount can be recalculated as per the intrest charged.

request type: POST
request URI: /api/v1/loan-mgmt/update-outstanding-amount

sample request
``` ```

sample response 
```
```