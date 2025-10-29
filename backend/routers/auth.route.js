import express from "express";
import { loginMiddleware, signupMiddleware, updateProfileMiddleware } from "../middlewares/auth.middleware.js";
import { deleteController, loginController, logoutController, profileDetailsController, signupController, updateProfileController } from "../controllers/auth.controller.js";
import { verifyCookies } from "../middlewares/verify.cookie.js";

const authRoute = express.Router();

authRoute.route("/signup").post(signupMiddleware, signupController);
authRoute.route("/login").post(loginMiddleware, loginController);
authRoute.route("/logout").post(verifyCookies, logoutController);
authRoute.route("/delete").delete(verifyCookies, deleteController);
authRoute.route("/profile-detail").get(verifyCookies, profileDetailsController);
authRoute.route("/update-profile").put(verifyCookies, updateProfileMiddleware, updateProfileController);

export default authRoute;