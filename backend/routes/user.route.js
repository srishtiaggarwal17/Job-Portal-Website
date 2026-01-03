import express from "express"
import {login,register,updateProfile,logout,verifyOtp,resendOtp} from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile)
router.route("/logout").get(logout)
router.route("/verifyOtp").post(verifyOtp);
router.route("/resendOtp").post(resendOtp);

export default router;
