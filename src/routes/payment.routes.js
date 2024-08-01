import { Router } from "express";
import { makePayment , getAllPayments, getPaymentsByAccountNumber} from "../controllers/payment.controller.js";

const router = Router();

//test router
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

router.route("/makepayment").post(makePayment);
router.route("/payment-details").get(getAllPayments);
router.route("/payment-details/:accountNumber").get(getPaymentsByAccountNumber);


export default router;