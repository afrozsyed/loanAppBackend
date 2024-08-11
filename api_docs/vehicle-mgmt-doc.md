# Vehicle Management api document

## get all the vehicle details
this api is used to get all the vehicle details.
Request Type: GET
URI: 

sample request
```
```

sample response
```
{
    "status": {
        "code": 200,
        "message": "Vehicle details fetched successfully",
        "type": "success"
    },
    "data": {
        "totalVehicles": 2,
        "vehicles": [
            {
                "_id": "66a882883a8f48101d543953",
                "customer": "66a882883a8f48101d543950",
                "vehicleType": "Car",
                "model": "Toyota Corolla",
                "engineNumber": "ABC123456789",
                "chassisNumber": "XYZ987654321",
                "vehicleNumber": "XYZ1234",
                "insurance": "ABC Insurance"
            },
            {
                "_id": "66a9d3b8e43771bba5013861",
                "customer": "66a9d3b8e43771bba501385e",
                "vehicleType": "Car",
                "model": "Maruthi Alto",
                "engineNumber": "Alto1245Hgasdy",
                "chassisNumber": "XT12547SGT64472",
                "vehicleNumber": "AP24GF3652",
                "insurance": "ABC Insurance"
            }
        ]
    }
}
```

## get Vehicle details by vehicle number

Request Type : GET
URI: /api/v1/vehicle-mgmt/vehicle-details/{vehicle-number}

sample Request
```
```

Sample Response 
```
{
    "status": {
        "code": 200,
        "message": "Vehicle details fetched successfully",
        "type": "success"
    },
    "data": {
        "_id": "66a9d3b8e43771bba5013861",
        "customer": "66a9d3b8e43771bba501385e",
        "vehicleType": "Car",
        "model": "Maruthi Alto",
        "engineNumber": "Alto1245Hgasdy",
        "chassisNumber": "XT12547SGT64472",
        "vehicleNumber": "AP24GF3652",
        "insurance": "ABC Insurance"
    }
}
```