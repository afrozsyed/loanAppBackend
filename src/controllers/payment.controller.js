import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { isNullOrEmpty } from "../utils/validationUtil.js";
import { Loan } from "../models/loan.model.js";
import { Payment } from "../models/payment.model.js";
import {
  calculateAdditionalInterest,
  calculateEMI,
  calculateNewTenue,
} from "../utils/commonHelperUtil.js";

const makePayment = asyncHandler(async (req, res) => {
  const { accountNumber, paymentMode, amountPaid } = req.body;
console.log("req.Body", req.body);

  // validate the input fields
  if (
    [accountNumber, paymentMode, amountPaid].some((field) => {
      isNullOrEmpty(field);
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const loan = await Loan.findOne({ accountNumber }).session(session);
    if (isNullOrEmpty(loan)) {
      throw new ApiError(404, "Loan not found");
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
      paymentDate: currentDate,
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
    const lastPaymentDateFromDB = loan.nextPaymentDate;
    loan.lastPaymentDate = new Date(lastPaymentDateFromDB);
    loan.nextPaymentDate.setMonth(lastPaymentDateFromDB.getMonth() + 1);

    console.log("=====Loan",loan);
    await loan.save({ session });
    await session.commitTransaction();
    session.endSession();

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

export { makePayment };
