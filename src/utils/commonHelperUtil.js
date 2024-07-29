import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import { Sequence } from "../models/sequence.model.js";

const generateAccessAndRefreshTokens = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const getNextSequenceValue = async (seqName, session) => {
  console.log("incomming seqName==",seqName);
  const sequenceDocument = await Sequence.findOneAndUpdate(
    { sequenceName: seqName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true , session}
  );
  console.log("sequenceDocument==", sequenceDocument);
  return sequenceDocument.sequenceValue;
};

export { generateAccessAndRefreshTokens , getNextSequenceValue};