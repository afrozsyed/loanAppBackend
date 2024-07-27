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