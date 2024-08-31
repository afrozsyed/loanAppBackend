import { User } from "../models/user.model.js";
import {ApiError} from "../utils/apiError.js";
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

// method to calculate EMI
const calculateEMI = (loanAmount, interestRate, tenure) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenure)) /
    (Math.pow(1 + monthlyInterestRate, tenure) - 1);
  console.log("EMI::", emi);
  return Math.floor(emi);
};

// method to calculate additional intrest per day
const calculateAdditionalInterest = (loanAmount, interestRate, days) => {
  const dailyInterestRate = interestRate / (365 * 100);
  const additionalInterest = loanAmount * dailyInterestRate * days;
  console.log("Additional Interest::", additionalInterest);
  return Math.ceil(additionalInterest);
};

// method to calculate the new tenue by keeping the emiAmount same
const calculateNewTenue = (loanAmount, interestRate, emiAmount) => {
  console.log("emiAmount::", emiAmount);
  console.log("loanAmount::", loanAmount);
  console.log("interestRate::", interestRate);
  const monthlyInterestRate = interestRate / (12 * 100);
  const tenure =
    Math.log(emiAmount / (emiAmount - loanAmount * monthlyInterestRate)) /
    Math.log(1 + monthlyInterestRate);
  console.log("New Tenue::", tenure);
  return Math.ceil(tenure);
};

// format the date
const formatDateToDDMMYYYY = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth(); // January is 0!
  const year = d.getFullYear();
  return new Date(year, month, day); // Returns a Date object without time
};

export { generateAccessAndRefreshTokens , getNextSequenceValue, calculateAdditionalInterest, calculateEMI, calculateNewTenue, formatDateToDDMMYYYY};