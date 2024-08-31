import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Loan } from "../models/loan.model.js";
import { Payment } from "../models/payment.model.js";
import { Customer } from "../models/customer.model.js"
import {
  calculateAdditionalInterest,
  calculateEMI,
  calculateNewTenue,
} from "../utils/commonHelperUtil.js";

const makePayment = asyncHandler(async (req, res) => {
  const { accountNumber, paymentMode, amountPaid, paymentDate } = req.body;
console.log("req.Body", req.body);

  // validate the input fields
  if (
    [accountNumber, paymentMode, amountPaid, paymentDate].some((field) => {
      isNullOrEmpty(field);
    })
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Mandatory fields are missing"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const loan = await Loan.findOne({ accountNumber }).session(session);
    if (isNullOrEmpty(loan)) {
      return res.status(400).json(new ApiResponse(400, "wrong account Number, Loan not Found"));
    }
console.log("Loan details===",loan);
    const currentDate = new Date();
    const outstandingUpdateDate = loan.outstandingUpdateDate || loan.startDate;
    console.log("outstandingUpdateDate===",outstandingUpdateDate);
    const daysSinceLastPayment = Math.ceil(
      (currentDate - outstandingUpdateDate) / (1000 * 60 * 60 * 24)
    );
    console.log("daysSinceLastPayment==",daysSinceLastPayment);
    // calculate the additional intrest on missing period
    const dailyInterestRate = loan.interestRate / (100 * 365);
    const additionalInterest =
      loan.outstandingPrincipal * dailyInterestRate * daysSinceLastPayment;
      console.log("additionalInterest==",additionalInterest);
      
    // add this additional intrest to the outstanding principal
    loan.outstandingPrincipal += additionalInterest;
    console.log("loan.outstandingPrincipal==", loan.outstandingPrincipal);
    // calculate the intrest and principal component of the EMI
    const monthlyInterestRate = loan.interestRate / (12 * 100);
    const interestComponent = loan.outstandingPrincipal * monthlyInterestRate;
    const principalComponent = amountPaid - interestComponent;
    console.log("interestComponent==", interestComponent);
    console.log("principalComponent==", principalComponent);

    // create a payment record
    const payment = new Payment({
      loanId: loan._id,
      actualPaymentDate: loan.nextPaymentDate, // get it from Loan schema.
      paymentDate: paymentDate,
      actualEMI: loan.emiAmount,
      amountPaid: amountPaid,
      interestComponent: interestComponent,
      principalComponent: principalComponent,
      paymentMode
    });
    await payment.save({ session });

    // update loan details
    loan.outstandingPrincipal -= principalComponent;
    console.log("outstandingPrincipal====" + loan.outstandingPrincipal);
    if (loan.outstandingPrincipal <= 0) {
      loan.outstandingPrincipal = 0;
      loan.status = "Closed";
    }
    loan.outstandingUpdateDate = currentDate;
    console.log("loan.outstandingUpdateDate====" + loan.outstandingUpdateDate);
    loan.paidEMIs += 1;
    console.log("loan.paidEMIs====" + loan.paidEMIs);

    // update payment dates and tenure
    const newTenure = calculateNewTenue(
      loan.outstandingPrincipal,
      loan.interestRate,
      loan.emiAmount
    );

    // update the tenure
    loan.tenure = newTenure;

    // Update nextPaymentDate
    console.log("loan.lastPaymentDate====" + loan.lastPaymentDate);
    let nextPaymentDate = new Date();
    if(loan.lastPaymentDate){
      nextPaymentDate = new Date(loan.lastPaymentDate);
    }else{
      nextPaymentDate = new Date(loan.startDate);
    }
    // const nextPaymentDate = new Date(loan.lastPaymentDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    loan.nextPaymentDate = nextPaymentDate;
    console.log("loan.nextPaymentDate====" + loan.nextPaymentDate);
    loan.lastPaymentDate = paymentDate;
    console.log("loan.lastPaymentDate====" + loan.lastPaymentDate);

    // const lastPaymentDateFromDB = loan.nextPaymentDate;
    // console.log("lastPaymentDateFromDB====" + lastPaymentDateFromDB);
    // loan.lastPaymentDate = new Date(lastPaymentDateFromDB);
    // console.log("loan.lastPaymentDate====" + loan.lastPaymentDate);
    // loan.nextPaymentDate.setMonth(lastPaymentDateFromDB.getMonth() + 1);
    // console.log("loan.nextPaymentDate====" + loan.nextPaymentDate);

    // console.log("=====Loan======",loan);
    await loan.save({ session });
    await session.commitTransaction();
    session.endSession();
  const loanDetailsnew = await Loan.find({ accountNumber });
  console.log("loanDetailsnew", loanDetailsnew);

    const paymentResponse = {
      AccountNumber: loan.accountNumber,
      paymentMode,
      amountPaid,
      principalComponent,
      interestComponent,
      outstandingPrincipal: loan.outstandingPrincipal,
      remainingEMIs: loan.tenure - loan.paidEMIs,
      nextPaymentDate: loan.nextPaymentDate,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, "Payment successful", paymentResponse));
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

});

// method is used to get all the payments made
const getAllPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find().select("-createdAt -updatedAt -__v");

    console.log("payments===", payments);

    // Adding Loan details to each Payment
    const paymentswithLoanDetails = await Promise.all(
      payments.map(async (payment) => {
        console.log("+++++Loan Id =====" + payment.loanId);
        const loanByPayment = await Loan.findById(payment.loanId).select(
          "-vehicle -createdAt -updatedAt -__v "
        );
        console.log("++++loanByPayment++", loanByPayment);

        const customerDetails = await Customer.findById(
          loanByPayment.customer
        ).select("-vehicle -createdAt -updatedAt -__v ");
        console.log("++++customerDetails++", customerDetails);

        return {
          ...payment.toObject(), // Convert Mongoose document to a plain JS object
          accountDetails: loanByPayment,
          customerDetails: customerDetails,
        };
      })
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Payment fetched successful",
          paymentswithLoanDetails
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// method to get the payments made by account number
const getPaymentsByAccountNumber = asyncHandler(async (req, res) => {
  const accountNumber = req.params.accountNumber;
  console.log("accountNumber===", accountNumber);
  try {
    const accountDetails = await Loan.findOne({ accountNumber }).select(
      "-createdAt -updatedAt -__v"
    );
    console.log("accountDetails===", accountDetails);

    // throw error if account not fount
    if (isNullOrEmpty(accountDetails)) {
      throw new ApiError(404, "Account not found");
    }

    const payments = await Payment.find({ loanId: accountDetails._id }).select(
      "-createdAt -updatedAt -__v"
    );

    console.log("payments===", payments);
    return res.status(200).json(new ApiResponse(200, "Payment fetched successful", payments));

  } catch (error) {
    throw new ApiError(500, error.message);
  }
});


// method used to fetch todays payments
const getTodaysPayments = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of the day
    console.log("+++today++",today);

    const payments = await Payment.find({
      paymentDate: { $gte: today },
    }).select("-createdAt -updatedAt -__v");

    console.log("+++++Payments====",payments);
    return res
      .status(200)
      .json(new ApiResponse(200, "Payment fetched successful", payments));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

// method to fetch payments between the dates
const getPaymentsBetweenDates = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    const payments = await Payment.find({
      paymentDate: { $gte: startDate, $lte: endDate },
    }).select("-createdAt -updatedAt -__v");

    console.log("+++++Payments====", payments);
    return res
      .status(200)
      .json(new ApiResponse(200, "Payment fetched successful", payments));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  makePayment,
  getAllPayments,
  getPaymentsByAccountNumber,
  getTodaysPayments,
  getPaymentsBetweenDates,
};
