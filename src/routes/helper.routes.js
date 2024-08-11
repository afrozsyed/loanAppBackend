import { Router } from "express";
import { createSequence } from "../controllers/helper.controller.js"

const router = Router();

// test api
router.route("/test").get((req, res) => {
    res.status(200).json({ message: "API is working" });
});

// route to create a sequence
router.route("/create-sequence").post(createSequence);

export default router;