import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import customerRouter from "./routes/customer.routes.js";
import loanRouter from "./routes/loan.routes.js";
import helperRouter from "./routes/helper.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import vehicleRouter from "./routes/vehicle.routes.js";


// routes declaration
app.use("/api/v1/user-mgmt", userRouter);
app.use("/api/v1/cust-mgmt", customerRouter);
app.use("/api/v1/loan-mgmt", loanRouter);
app.use("/api/v1/helper-tools", helperRouter);
app.use("/api/v1/payment-mgmt", paymentRouter);
app.use("/api/v1/vehicle-mgmt", vehicleRouter);



export default app;