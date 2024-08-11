import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Vehicle } from "../models/vehicle.model.js";

// method to get all the details of the vehicles
const getAllVehicleDetails = asyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).select("-createdAt -updatedAt -__v"); // find all the vehicles
    console.log("===vehicle Details===", vehicles);
    if (isNullOrEmpty(vehicles)) {
      return res
        .status(200)
        .json(new ApiResponse(200, "No vehicles found", []));
    }
    const totalVehicles = vehicles.length;
    console.log("===totalVehicles===", totalVehicles);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Vehicle details fetched successfully", {totalVehicles: totalVehicles, vehicles})
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching vehicle details");
  }
});

// method to get the vehicle details by vehicle Number
const getVehicleByNumber = asyncHandler(async (req, res) => {
  try {
    const vehicleNumber = req.params.vehicleNumber;
    console.log("===vehicleNumber===", vehicleNumber);

    const vehicle = await Vehicle.findOne({ vehicleNumber }).select("-createdAt -updatedAt -__v"); // find vehicle by vehicle number
    if (isNullOrEmpty(vehicle)) {
      return res
        .status(200)
        .json(new ApiResponse(200, "No vehicle found with this vehicle number", {}));
    }
    console.log("===vehicle===", vehicle);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Vehicle details fetched successfully", vehicle)
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching vehicle details");
  }
});


export { getAllVehicleDetails, getVehicleByNumber };
