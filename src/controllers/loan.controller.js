import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Customer } from "../models/customer.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { Loan } from "../models/loan.model.js";
import {
  getNextSequenceValue,
  calculateAdditionalInterest,
  calculateEMI,
  calculateNewTenue,
} from "../utils/commonHelperUtil.js";
import { Payment } from "../models/payment.model.js";

// creating a loan for the New Customers. need to have all the details of the customer, vehicle and loan
const createLoanForNewCustomer = asyncHandler(async (req, res) => {
  // collect Date from the request body
  console.log("Request Body::", req.body);
  const { customer, vehicle, loan } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // get customer details
    const {
      name,
      phoneNumber,
      email,
      address,
      dateOfBirth,
      gender,
      aadharNumber,
    } = customer;

    // validate the customer details
    if (
      [
        name,
        phoneNumber,
        email,
        address,
        dateOfBirth,
        gender,
        aadharNumber,
      ].some((field) => {
        return isNullOrEmpty(field);
      })
    ) {
      throw new ApiError(400, "mandatory fields in customer are missing");
    }

    // check if customer already exist
    const existedCustomer = await Customer.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existedCustomer) {
      throw new ApiError(400, "Customer already exist");
    }

    // save customer details
    const newCustomer = new Customer({
      name,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      aadharNumber,
    });
    const savedCustomer = await newCustomer.save({ session });
    if (!savedCustomer) {
      throw new ApiError(500, "Error while saving customer");
    }

    // get vehicle details
    const {
      vehicleType,
      model,
      engineNumber,
      chassisNumber,
      vehicleNumber,
      insurance,
    } = vehicle;
    if (
      [vehicleType, model, engineNumber, chassisNumber, vehicleNumber].some(
        (field) => {
          return isNullOrEmpty(field);
        }
      )
    ) {
      throw new ApiError(400, "mandatory fields in vehicle are missing");
    }

    // check if vehicle already exist
    const existedVehicle = await Vehicle.findOne({
      $or: [{ vehicleNumber }, { chassisNumber }],
    });
    if (existedVehicle) {
      throw new ApiError(400, "Vehicle already exist");
    }

    // save vehicle details
    const newVehicle = new Vehicle({
      customer: savedCustomer._id,
      vehicleType,
      model,
      engineNumber,
      chassisNumber,
      vehicleNumber,
      insurance,
    });
    const savedVehicle = await newVehicle.save({ session });

    if (!savedVehicle) {
      throw new ApiError(500, "Error while saving vehicle Details");
    }

    // get loan details
    const {
      principalAmount,
      interestRate,
      tenure,
      guarantorName,
      guarantorPhoneNumber,
      guarantorAddress,
      guarantorAadharNumber,
    } = loan;

    // validate the loan details
    if (
      [
        principalAmount,
        interestRate,
        tenure,
        guarantorName,
        guarantorPhoneNumber,
        guarantorAddress,
        guarantorAadharNumber,
      ].some((field) => {
        return isNullOrEmpty(field);
      })
    ) {
      throw new ApiError(400, "mandatory fields in loan are missing");
    }

    // Calculate EMI
    const emiAmount = calculateEMI(
      loan.principalAmount,
      loan.interestRate,
      loan.tenure
    );

    // Get next account number
    const accountNumber = await getNextSequenceValue(
      "loanAccountNumberSeq",
      session
    );
    console.log("=====account Number====" + accountNumber);
    // get next payment date
    const nextPaymentDate = new Date();
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

    // save the loan details
    const newLoan = new Loan({
      accountNumber,
      customer: savedCustomer._id,
      vehicle: savedVehicle._id,
      principalAmount,
      outstandingPrincipal: principalAmount,
      interestRate,
      actualTenure: tenure,
      tenure,
      startDate: new Date(),
      emiAmount,
      outstandingUpdateDate: null,
      lastPaymentDate: null,
      nextPaymentDate: nextPaymentDate,
      paidEMIs: 0,
      guarantorName,
      guarantorPhoneNumber,
      guarantorAddress,
      guarantorAadharNumber,
    });

    const savedLoan = await newLoan.save({ session });

    if (!savedLoan) {
      throw new ApiError(500, "Error while saving loan Details");
    }
    console.log("==== savedLoan ==", savedLoan);

    await session.commitTransaction();
    session.endSession();

    // send success response to the client
    res
      .status(200)
      .json(new ApiResponse(200, "loan created successfully ", savedLoan));
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

// method to update the outstanding amount of the loan as per the daily intrest rates.
const updateOutstandingAmount = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const loans = await Loan.find().populate("customer");
    console.log("Loans::", loans);
    const currentDate = new Date();

    for (const loan of loans) {
      const lastPaymentDate = loan.outstandingUpdateDate || loan.startDate;
      const daysSinceLastPayment = Math.floor(
        (currentDate - lastPaymentDate) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastPayment > 0) {
        const additionalInterest = calculateAdditionalInterest(
          loan.outstandingPrincipal,
          loan.interestRate,
          daysSinceLastPayment
        );

        loan.outstandingPrincipal += additionalInterest;

        const newTenure = calculateNewTenue(
          loan.outstandingPrincipal,
          loan.interestRate,
          loan.emiAmount
        );

        loan.tenure = newTenure;
        loan.outstandingUpdateDate = currentDate;
      }

      await loan.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    res
      .status(200)
      .json(new ApiResponse(200, "Outstanding amount updated successfully"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

// method to get the details of all the loans
const getLoanDetails = asyncHandler(async (req, res) => {
  // fetch all the loan details
  const loans = await Loan.find()
    .populate({
      path: "customer",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "vehicle",
      select: "-createdAt -updatedAt",
    })
    .select(" -createdAt -updatedAt");
  console.log("loans from DB :::", loans);

  // Adding payments details to each loan
  const loanDetailsWithPayments = await Promise.all(
    loans.map(async (loan) => {
      const paymentsPerLoan = await Payment.find({ loanId: loan._id }).select(
        "-createdAt -updatedAt"
      );
      console.log("++++paymentsPerLoan++", paymentsPerLoan);

      return {
        ...loan.toObject(), // Convert Mongoose document to a plain JS object
        payments: paymentsPerLoan,
      };
    })
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "loan details fetched successfully",
        loanDetailsWithPayments
      )
    );
});

// method to get the loan details by loan id
const getLoanDetailsByLoanId = asyncHandler(async (req, res) => {
  console.log(req.params);
  const accountNumber = req.params.accountNumber;
  console.log("accountNumber::", accountNumber);
  const loan = await Loan.findOne({ accountNumber: accountNumber })
    .populate({
      path: "customer",
      select: "-_id -createdAt -updatedAt -__v",
    })
    .populate({
      path: "vehicle",
      select: "-_id -createdAt -updatedAt -__v",
    })
    .select("-createdAt -updatedAt -__v");
  console.log("Loan fetched from db====", loan);

  // send error if loan is not available
  if (isNullOrEmpty(loan)) {
    throw new ApiError(400, "Loan with given account Number is not available");
  }

  // fetch the payment details and inclue in the new object
  // getting the payment details for the loan
  console.log("Loan Id======",loan._id);
  const paymentsForLoan = await Payment.find({ loanId: loan._id }).select(
    "-_id -createdAt -updatedAt -__v"
  );
  console.log("++++paymentsPerLoan++", paymentsForLoan);

  // combine payment details with the loan details

  const accountDetailsWithPayments = {
    ...loan.toObject(),
    payments: paymentsForLoan,
  };
  console.log("accountDetailsWithPayments::", accountDetailsWithPayments);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "loan details fetched successfully",
        accountDetailsWithPayments
      )
    );
});

// method to get the dashboard details
const getDashboardDetails = asyncHandler( async(req,res) => {

  try {
    console.log("Inside getDashboardDetails");
  
    // geting the Loan status
    // fetch all the loan details
    const loans = await Loan.find()
      .populate({
        path: "customer",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "vehicle",
        select: "-createdAt -updatedAt",
      })
      .select(" -createdAt -updatedAt");
    console.log("loans from DB :::", loans);
    const totalLoans = loans.length;
    console.log("totalLoans::", totalLoans);
  
    const closedLoans = loans.filter((loan)=> loan.status == 'closed').length;
    console.log("closedLoans::", closedLoans);
  
    const activeLoans = loans.filter((loan)=> loan.status == 'active').length;
    console.log("activeLoans::", activeLoans);
  
    let totalDisbutedAmount = 0;
    const overDueLoans = [];
    const today = new Date();
    loans.map((loan)=>{
      console.log(loan.nextPaymentDate);
      if (loan.nextPaymentDate < today) {
        console.log("Inside if",loan.accountNumber);
        overDueLoans.push(loan);
      }
      totalDisbutedAmount += loan.principalAmount;
    });
  
    console.log("toatalDisbutedAmount::",totalDisbutedAmount);
    console.log("overDueLoans::",overDueLoans.length);
  
    // todays collection.. 
    let todaysCollection = 0;
    const todayspayments = await Payment.find({
      paymentDate: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    }).select("-createdAt -updatedAt -__v");
    console.log("todayspayments::", todayspayments);
    todayspayments.map((payment)=>{
      todaysCollection += payment.amountPaid;
    });
  
      console.log("todaysCollection::", todaysCollection);
  
    
  res
  .status(200)
  .json(
    new ApiResponse(
      200,
      "Dashboard details fetched successfully",
      {
        totalLoans,
        closedLoans,
        activeLoans,
        totalDisbutedAmount,
        todaysCollection,
        overDueLoans
      }
    )
  );
  } catch (error) {
    throw error;    
  }

});

export {
  createLoanForNewCustomer,
  updateOutstandingAmount,
  getLoanDetails,
  getLoanDetailsByLoanId,
  getDashboardDetails,
};
