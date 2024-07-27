# user management api docummentation

main urI:: /api/v1/user-mgmt

## register a user
Method Type: POST
URI:: /api/v1/user-mgmt/register

### sample request
```
{
    "userName" : "test2",
    "password" : "testPas1234",
    "fullName" : "test user new",
    "phoneNumber" : "985647",
    "role" : "user" // optional ["user", "admin"]
}
```
### sample success response
```
{
    "status": {
        "code": 200,
        "message": "success",
        "type": "success"
    },
    "data": {
        "_id": "66a4b558150ccb320de42ecf",
        "userName": "test2",
        "fullName": "test user new",
        "phoneNumber": "985647",
        "role": "user",
        "createdAt": "2024-07-27T08:52:40.940Z",
        "updatedAt": "2024-07-27T08:52:40.940Z",
        "__v": 0
    }
}
```

### sample failure response
```
{
    "statusCode": 400,
    "message": "User already exist",
    "type": "error"
}
```


## Login a User

Method Type: POST
URI:: /api/v1/user-mgmt/login

Sample request
```
{
    "userName": "testUser"
    "password": "14785asd"
}
```

sample response
```
{
    "status": {
        "code": 200,
        "message": "login successful",
        "type": "success"
    },
    "data": {
        "user": {
            "_id": "66a4b558150ccb320de42ecf",
            "userName": "test2",
            "fullName": "test user new",
            "phoneNumber": "985647",
            "role": "user",
            "createdAt": "2024-07-27T08:52:40.940Z",
            "updatedAt": "2024-07-27T15:58:30.521Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE0YjU1ODE1MGNjYjMyMGRlNDJlY2YiLCJ1c2VyTmFtZSI6InRlc3QyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjIwOTU5MTAsImV4cCI6MTcyMjE4MjMxMH0.meWyHaoz3ZAwo0vIm6mivLW4Jpv-IvUCgfamzPEGXEk",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmE0YjU1ODE1MGNjYjMyMGRlNDJlY2YiLCJpYXQiOjE3MjIwOTU5MTAsImV4cCI6MTcyMjk1OTkxMH0.tkZHl7aHKO-YZfzfiZm6GX0oQqKjORBoJmUk0NDPQOM"
    }
}
```


## Logout user
will clear the cookies and delete the refreshToken in DB

Method Type: POST
URI:: /api/v1/user-mgmt/login

sample request
```
```

sample response
```
{
    "status": {
        "code": 200,
        "message": "logout successfull",
        "type": "success"
    },
    "data": {}
}
```