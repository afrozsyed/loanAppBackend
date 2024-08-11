## make payment

Type: POST
URI: /api/v1/payment-mgmt/makepayment

sample request

```
{
    "accountNumber":"33",
    "paymentMode":"online",
    "amountPaid": 470

}
```

sample response
```
{
    "status": {
        "code": 200,
        "message": "Payment successful",
        "type": "success"
    },
    "data": {
        "AccountNumber": "33",
        "paymentMode": "online",
        "amountPaid": 470,
        "principalComponent": 385.93607305936075,
        "interestComponent": 84.06392694063926,
        "outstandingPrincipal": 9701.735159817352,
        "remainingEMIs": 23,
        "nextPaymentDate": "2024-08-29T06:04:56.933Z"
    }
}
```


## get all Payments 
it will give all the payments with the details of customer and account.


Request type : GET
URL: /api/v1/payment-mgmt/payment-details

sample request
```
```

sample Response
```
{
    "status": {
        "code": 200,
        "message": "Payment fetched successful",
        "type": "success"
    },
    "data": [
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
            "accountDetails": {
                "_id": "66a882883a8f48101d543956",
                "accountNumber": "33",
                "customer": "66a882883a8f48101d543950",
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
                "status": "active"
            },
            "customerDetails": {
                "_id": "66a882883a8f48101d543950",
                "name": "test customer",
                "email": "cust@gmail.com",
                "phoneNumber": "1234567890",
                "address": "124-4 telangana",
                "dateOfBirth": "1992-12-31T18:30:00.000Z",
                "gender": "Male",
                "aadharNumber": "147852145698",
                "createdAt": "2024-07-30T06:04:56.782Z",
                "updatedAt": "2024-07-30T06:04:56.782Z",
                "__v": 0
            }
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
            "accountDetails": {
                "_id": "66a882883a8f48101d543956",
                "accountNumber": "33",
                "customer": "66a882883a8f48101d543950",
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
                "status": "active"
            },
            "customerDetails": {
                "_id": "66a882883a8f48101d543950",
                "name": "test customer",
                "email": "cust@gmail.com",
                "phoneNumber": "1234567890",
                "address": "124-4 telangana",
                "dateOfBirth": "1992-12-31T18:30:00.000Z",
                "gender": "Male",
                "aadharNumber": "147852145698",
                "createdAt": "2024-07-30T06:04:56.782Z",
                "updatedAt": "2024-07-30T06:04:56.782Z",
                "__v": 0
            }
        },
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
            "accountDetails": {
                "_id": "66a9d3b8e43771bba5013864",
                "accountNumber": "34",
                "customer": "66a9d3b8e43771bba501385e",
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
                "status": "active"
            },
            "customerDetails": {
                "_id": "66a9d3b8e43771bba501385e",
                "name": "test customer 2",
                "email": "cust2@gmail.com",
                "phoneNumber": "1425632541",
                "address": "124-4 andhra pradesh",
                "dateOfBirth": "1990-12-31T18:30:00.000Z",
                "gender": "Male",
                "aadharNumber": "125478965412",
                "createdAt": "2024-07-31T06:03:36.448Z",
                "updatedAt": "2024-07-31T06:03:36.448Z",
                "__v": 0
            }
        }
    ]
}
```

## get Payment Details by account Number

it will give the payment details according to the account number passed as a parameter

Request type : GET
URI: /api/v1/payment-mgmt/payment-details/{account-Number}

sample request
```
```

sample response 
```
{
    "status": {
        "code": 200,
        "message": "Payment fetched successful",
        "type": "success"
    },
    "data": [
        {
            "_id": "66a8af2c204b99bbf4aa2e0d",
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
            "_id": "66a9d3e2e43771bba5013867",
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
```


## get Todays Payments

this method will return payments done on current date

Request Type: GET
URL: /api/v1/payment-mgmt/todays-payments

sample request
```
```
sample response 
```
{
    "status": {
        "code": 200,
        "message": "Payment fetched successful",
        "type": "success"
    },
    "data": [
        {
            "_id": "66ab8ff17924190a21c04851",
            "loanId": "66a9d3b8e43771bba5013864",
            "actualPaymentDate": "2024-08-31T06:03:36.652Z",
            "paymentDate": "2024-08-01T13:38:57.709Z",
            "actualEMI": 4448,
            "amountPaid": 4500,
            "interestComponent": 1976.9631764008257,
            "principalComponent": 2523.0368235991746,
            "paymentMode": "cash"
        }
    ]
}
```