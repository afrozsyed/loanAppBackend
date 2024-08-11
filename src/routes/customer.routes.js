import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCustomer } from "../controllers/customer.controller.js";

const router = Router();
// test create customer
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "Test API is working" });
});



router.route("/create").post(createCustomer);

export default router;