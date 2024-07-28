import { Router } from "express";
import { createLoanForNewCustomer } from "../controllers/loan.controller.js";

const router = Router();

//test api
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

router.route("/create-newcust-loan").post(createLoanForNewCustomer);


export default router;