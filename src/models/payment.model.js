import  Mongoose  from "mongoose";

const paymentSchema = new Mongoose.Schema(
  {
    loanId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
    actualPaymentDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    actualEMI: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    interestComponent: {
      type: Number,
      required: true,
    },
    principalComponent: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = Mongoose.model("Payment", paymentSchema);