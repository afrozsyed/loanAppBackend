import mongoose from "mongoose";

const customerScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String
    },
    idProof: {
        type: String
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
},{
    timestamps: true,
});

export const Customer = mongoose.model("Customer", customerScheema);