import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

//creating a pre-hook to encript the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// creating a method to compare the entered password with the hashed password
userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// creating a method to generate access token
userSchema.methods.generateAccessToken =function(){
    return jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            role:this.role
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// creating a method to generate refresh token
userSchema.methods.generateRefreshToken =function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);
