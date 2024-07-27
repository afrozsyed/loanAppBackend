import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshTokens } from "../utils/commonHelperUtil.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};

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

// controller method to login the user
const loginUser = asyncHandler(async (req, res) => {
  // take the data from the request body
  console.log("==== login user ==", req.body);
  const{userName, password} = req.body;
  // validate the data
  if (
    [userName, password].some((field) => {
      return isNullOrEmpty(field);
    })
  ) {
    throw new ApiError(400, "mandatory fields are missing");
  }
  // check if the user exist
  const user = await User.findOne({ userName });
  if (!user) throw new ApiError(400, "userName or Password is not vallid");
  // match the password if its corret or not
  const isValidPassword = await user.isPasswordMatched(password);
  if (!isValidPassword) throw new ApiError(400, "userName or Password is not vallid");
  // generate the access token and refresh token
  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
  // send the response back to the client with the access token and refresh token in cookies
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  // send the response back to the client with the user details
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(new ApiResponse(200, "login successful", 
    {user: loggedInUser,accessToken,refreshToken}
  ));
});

// controller method to logout user
const logoutUser = asyncHandler(async (req, res) => {
  // taking the user login details from the middleware
  console.log("user from cookie::", req.user._id);
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  // clear the cookies

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "logout successfull"));
});

// controller method to get the refreshAccessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // get the refresh token from the cookies or body
    const incommingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
      console.log("incommingRefreshToken::",incommingRefreshToken);
    if (!incommingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    // validate the refresh token
    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    console.log("decodedToken::",decodedToken);
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(401, "Invalid refresh token");
    if (incommingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");
    // generate the new access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    // send the response back to the client with the new access token and refresh token in cookies

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "user refresh successfull", {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// controller method to change password
const changePassword = asyncHandler(async (req, res) => {
  // get the old and new passwords from the request
  console.log("++body::",req.body);
  const { oldPassword, newPassword } = req.body;
  // validate the passwords fields
  if (
    [oldPassword, newPassword].some((field) => {
      return isNullOrEmpty(field);
    })
  ) {
    throw new ApiError(400, "mandatory fields are missing");
  }
  // check if the old password is matched
  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordMatched(oldPassword);
  if (!isPasswordValid) throw new ApiError(400, "Invalid old password");
  // save the new password in database
  user.password = newPassword;
  await user.save({ validateBeforeSave: true });
  // send back the response
  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});


export { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword};
