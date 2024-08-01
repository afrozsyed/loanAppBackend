import { Router } from "express";
import { getAllVehicleDetails, getVehicleByNumber } from "../controllers/vehicle.controller.js";

const router = Router();

// test api
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

// route to create a sequence
router.route("/vehicle-details").get(getAllVehicleDetails);
router.route("/vehicle-details/:vehicleNumber").get(getVehicleByNumber);

export default router;