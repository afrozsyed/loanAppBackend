import { Router } from "express";
import { makePayment } from "../controllers/payment.controller.js";

const router = Router();

//test router
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

router.route("/makepayment").post(makePayment);


export default router;