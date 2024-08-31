import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Sequence } from "../models/sequence.model.js";

const createSequence = asyncHandler(async (req, res) => {
  const { sequenceName, sequenceValue } = req.body;

  if ([sequenceName,sequenceValue].some((field)=>{
    return isNullOrEmpty(field);
  })) {
    throw new ApiError(400, "All fields are required");
  }

  const sequence = await Sequence.create({
    sequenceName,
    sequenceValue
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Sequence created successfully",sequence,));
});


export { createSequence };