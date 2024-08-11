import mongoose from "mongoose";

const vehicleScheema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    engineNumber: {
      type: String,
      required: true,
      unique: true
    },
    chassisNumber: {
      type: String,
      required: true,
      unique: true
    },
    vehicleNumber: {
      type: String
    },
    insurance: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

export const Vehicle = mongoose.model("Vehicle", vehicleScheema);
