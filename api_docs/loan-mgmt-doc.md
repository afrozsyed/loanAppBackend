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

## get all loan Details with payments

request type: GET
request URI: /api/v1/loan-mgmt/loan-details

sample request
``` ```

sample response 
```
{
    "status": {
        "code": 200,
        "message": "loan details fetched successfully",
        "type": "success"
    },
    "data": [
        {
            "_id": "66a882883a8f48101d543956",
            "accountNumber": "33",
            "customer": {
                "_id": "66a882883a8f48101d543950",
                "name": "test customer",
                "email": "cust@gmail.com",
                "phoneNumber": "1234567890",
                "address": "124-4 telangana",
                "dateOfBirth": "1992-12-31T18:30:00.000Z",
                "gender": "Male",
                "aadharNumber": "147852145698",
                "__v": 0
            },
            "vehicle": {
                "_id": "66a882883a8f48101d543953",
                "customer": "66a882883a8f48101d543950",
                "vehicleType": "Car",
                "model": "Toyota Corolla",
                "engineNumber": "ABC123456789",
                "chassisNumber": "XYZ987654321",
                "vehicleNumber": "XYZ1234",
                "insurance": "ABC Insurance",
                "__v": 0
            },
            "principalAmount": 10000,
            "outstandingPrincipal": 9335.26311252893,
            "interestRate": 10,
            "actualTenure": 24,
            "tenure": 23,
            "startDate": "2024-06-29T06:04:56.933Z",
            "emiAmount": 461,
            "outstandingUpdateDate": "2024-07-31T06:04:18.142Z",
            "lastPaymentDate": "2024-07-29T06:04:56.933Z",
            "nextPaymentDate": "2024-07-29T06:04:56.933Z",
            "paidEMIs": 2,
            "guarantorName": "guarantor_test",
            "guarantorPhoneNumber": "1452369874",
            "guarantorAddress": "guarantorAddress test",
            "guarantorAadharNumber": "123652145236",
            "status": "active",
            "__v": 0,
            "payments": [
                {
                    "_id": "66a8af2c204b99bbf4aa2e0d",
                    "loanId": "66a882883a8f48101d543956",
                    "actualPaymentDate": "2024-07-29T06:04:56.933Z",
                    "paymentDate": "2024-07-30T09:15:24.436Z",
                    "actualEMI": 461,
                    "amountPaid": 470,
                    "interestComponent": 84.06392694063926,
                    "principalComponent": 385.93607305936075,
                    "paymentMode": "online",
                    "__v": 0
                },
                {
                    "_id": "66a9d3e2e43771bba5013867",
                    "loanId": "66a882883a8f48101d543956",
                    "actualPaymentDate": "2024-07-29T06:04:56.933Z",
                    "paymentDate": "2024-07-31T06:04:18.142Z",
                    "actualEMI": 461,
                    "amountPaid": 450,
                    "interestComponent": 80.86994307875149,
                    "principalComponent": 369.1300569212485,
                    "paymentMode": "online",
                    "__v": 0
                }
            ]
        },
        {
            "_id": "66a9d3b8e43771bba5013864",
            "accountNumber": "34",
            "customer": {
                "_id": "66a9d3b8e43771bba501385e",
                "name": "test customer 2",
                "email": "cust2@gmail.com",
                "phoneNumber": "1425632541",
                "address": "124-4 andhra pradesh",
                "dateOfBirth": "1990-12-31T18:30:00.000Z",
                "gender": "Male",
                "aadharNumber": "125478965412",
                "__v": 0
            },
            "vehicle": {
                "_id": "66a9d3b8e43771bba5013861",
                "customer": "66a9d3b8e43771bba501385e",
                "vehicleType": "Car",
                "model": "Maruthi Alto",
                "engineNumber": "Alto1245Hgasdy",
                "chassisNumber": "XT12547SGT64472",
                "vehicleNumber": "AP24GF3652",
                "insurance": "ABC Insurance",
                "__v": 0
            },
            "principalAmount": 200000,
            "outstandingPrincipal": 197566.4109589041,
            "interestRate": 12,
            "actualTenure": 60,
            "tenure": 60,
            "startDate": "2024-07-31T06:03:36.656Z",
            "emiAmount": 4448,
            "outstandingUpdateDate": "2024-07-31T06:05:20.040Z",
            "lastPaymentDate": "2024-08-31T06:03:36.652Z",
            "nextPaymentDate": "2024-08-31T06:03:36.652Z",
            "paidEMIs": 1,
            "guarantorName": "guarantor_test 2",
            "guarantorPhoneNumber": "2578541256",
            "guarantorAddress": "guarantorAddress test 2",
            "guarantorAadharNumber": "123645145236",
            "status": "active",
            "__v": 0,
            "payments": [
                {
                    "_id": "66a9d420e43771bba501386b",
                    "loanId": "66a9d3b8e43771bba5013864",
                    "actualPaymentDate": "2024-08-31T06:03:36.652Z",
                    "paymentDate": "2024-07-31T06:05:20.040Z",
                    "actualEMI": 4448,
                    "amountPaid": 4500,
                    "interestComponent": 2000.6575342465753,
                    "principalComponent": 2499.3424657534247,
                    "paymentMode": "online",
                    "__v": 0
                }
            ]
        }
    ]
}
```


## get Loan Details with account Number

request type: GET
request URI: /api/v1/loan-mgmt/loan-details/33

sample request
``` ```
sample response 
```
{
    "status": {
        "code": 200,
        "message": "loan details fetched successfully",
        "type": "success"
    },
    "data": {
        "_id": "66a882883a8f48101d543956",
        "accountNumber": "33",
        "customer": {
            "name": "test customer",
            "email": "cust@gmail.com",
            "phoneNumber": "1234567890",
            "address": "124-4 telangana",
            "dateOfBirth": "1992-12-31T18:30:00.000Z",
            "gender": "Male",
            "aadharNumber": "147852145698"
        },
        "vehicle": {
            "customer": "66a882883a8f48101d543950",
            "vehicleType": "Car",
            "model": "Toyota Corolla",
            "engineNumber": "ABC123456789",
            "chassisNumber": "XYZ987654321",
            "vehicleNumber": "XYZ1234",
            "insurance": "ABC Insurance"
        },
        "principalAmount": 10000,
        "outstandingPrincipal": 9335.26311252893,
        "interestRate": 10,
        "actualTenure": 24,
        "tenure": 23,
        "startDate": "2024-06-29T06:04:56.933Z",
        "emiAmount": 461,
        "outstandingUpdateDate": "2024-07-31T06:04:18.142Z",
        "lastPaymentDate": "2024-07-29T06:04:56.933Z",
        "nextPaymentDate": "2024-07-29T06:04:56.933Z",
        "paidEMIs": 2,
        "guarantorName": "guarantor_test",
        "guarantorPhoneNumber": "1452369874",
        "guarantorAddress": "guarantorAddress test",
        "guarantorAadharNumber": "123652145236",
        "status": "active",
        "payments": [
            {
                "loanId": "66a882883a8f48101d543956",
                "actualPaymentDate": "2024-07-29T06:04:56.933Z",
                "paymentDate": "2024-07-30T09:15:24.436Z",
                "actualEMI": 461,
                "amountPaid": 470,
                "interestComponent": 84.06392694063926,
                "principalComponent": 385.93607305936075,
                "paymentMode": "online"
            },
            {
                "loanId": "66a882883a8f48101d543956",
                "actualPaymentDate": "2024-07-29T06:04:56.933Z",
                "paymentDate": "2024-07-31T06:04:18.142Z",
                "actualEMI": 461,
                "amountPaid": 450,
                "interestComponent": 80.86994307875149,
                "principalComponent": 369.1300569212485,
                "paymentMode": "online"
            }
        ]
    }
}
```



