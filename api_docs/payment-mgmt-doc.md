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