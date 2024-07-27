import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);

// router to change password test
router.route("/change-password").post((req, res) => {
    console.log("change password");
});

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;