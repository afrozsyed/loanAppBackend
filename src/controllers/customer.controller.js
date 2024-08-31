import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Customer } from "../models/customer.model.js";



// create customer
const createCustomer = asyncHandler( async(req,res)=>{
  console.log("data inside", req.body);
  // collect the date from the request
  const {
    name,
    phoneNumber,
    gender,
    email,
    address,
    dateOfBirth,
    aadharNumber,
  } = req.body;
  // validate the data
  if (
    [name, phoneNumber, gender, email, address, dateOfBirth, aadharNumber].some(
      (field) => {
        return isNullOrEmpty(field);
      }
    )
  ) {
    throw new ApiError(400, "mandatory fields are missing");
  }
  // create the customer object
  const customer = await Customer.create({
    name,
    phoneNumber,
    gender,
    email,
    address,
    dateOfBirth,
    aadharNumber,
  });
  console.log("customer created", customer);
  // check if the customer is created successfully 
  if (!customer) {
    throw new ApiError(500, "Something went wrong while creating the customer");}
    // return success message to response
    res.status(200).json(new ApiResponse(200, "Customer created successfully", finalUserDetails));
});


// get customer
const getCustomer = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message: "OK"
    })
});


// update customer
const updateCustomer = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message: "OK"
    })
});


// delete customer
const deleteCustomer = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message: "OK"
    })
});


// get all customers
const getAllCustomers = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message: "OK"
    })
});

export {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomers
}