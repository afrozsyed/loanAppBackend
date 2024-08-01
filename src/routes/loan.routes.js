import { Router } from "express";
import { createLoanForNewCustomer, updateOutstandingAmount, getLoanDetails, getLoanDetailsByLoanId } from "../controllers/loan.controller.js";

const router = Router();

//test api
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

router.route("/create-newcust-loan").post(createLoanForNewCustomer);
router.route("/update-outstanding-amount").post(updateOutstandingAmount);
router.route("/loan-details").get(getLoanDetails);
router.route("/loan-details/:accountNumber").get(getLoanDetailsByLoanId);


export default router;