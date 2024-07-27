import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { User } from "../models/user.model.js";

// controller method to register user
const registerUser = asyncHandler(async (req, res) => {
  // take data from the request
  const { userName, password, fullName, phoneNumber, role } = req.body;
  console.log("==== req.body ==", req.body);

  // validate if all the required fileds are present and correct
  if (
    [fullName, userName, password, phoneNumber].some((field) => {
      return isNullOrEmpty(field);
    })
  ) {
    throw new ApiError(400, "mandatory fields are missing");
  }

  // check if user already exist
  const existedUser = await User.findOne({ userName });
  if (existedUser) {
    console.log("method inside user already exist");
    return res.status(400).json(new ApiError(400, "User already exist"));
    //throw new ApiError(400, "User already exist");
  }

  // save the user to the database -- (create user object -- create entry in db)

  const createdUser = await User.create({
    userName,
    password,
    fullName,
    phoneNumber,
    role,
  });

  // check if user is created successfully
  console.log("==== Created user ==", createdUser);
  if (isNullOrEmpty(createdUser)) {
    return res
      .status(500)
      .json(
        new ApiError(400, "Something went wrong while registering the user")
      );
  }

  // remove password and refresh tokens from the response object
  const finalUserDetails = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  console.log("==== finalUserDetails ==", finalUserDetails);
  // send the response back to the client with the user details
  res.status(200).json(new ApiResponse(200, "success", finalUserDetails));
});

export { registerUser };
