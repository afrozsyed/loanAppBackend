import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      trim: true
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,      
      trim: true
    },
    principalAmount: {
      type: Number,
      required: true,      
      trim: true
    },
    outstandingPrincipal: {
      type: Number,
      required: true,      
      trim: true
    },
    interestRate: {
      type: Number,
      required: true,      
      trim: true
    },
    tenure: {
      type: Number,
      required: true,      
      trim: true
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,      
      trim: true
    },
    emiAmount: {
      type: Number,
      required: true,      
      trim: true
    },
    lastPaymentDate: {
      type: Date
    },
    nextPaymentDate: {
      type: Date
    },
    paidEMIs: {
      type: Number,
      required: true,
      trim: true,
      default: 0
    },
    guarantorName: {
      type: String,
      required: true,      
      trim: true
    },
    guarantorPhoneNumber: {
      type: String,
      required: true,      
      trim: true
    },
    guarantorAddress: {
      type: String,
      required: true,      
      trim: true
    },
    guarantorAadharNumber: {
      type: String,
      required: true,      
      trim: true
    },
    status: {
      type: String,
      enum: ["active", "closed","preClosed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Loan = mongoose.model("Loan", loanSchema);