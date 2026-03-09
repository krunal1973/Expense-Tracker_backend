import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  registerValidation,
  loginValidation,
} from "../validations/auth.validation.js";

const router = express.Router();

// Register
router.post("/register",
registerValidation,validate,registerUser);

// Login
router.post("/login",loginValidation,validate,loginUser);

// Refresh Access Token
router.post("/refresh",refreshAccessToken);

// Logout (Protected)
router.post("/logout",protect,logoutUser);

// Get Current User (Protected)
router.get("/me",protect,(req, res) => {
    return res.status(200).json({
      success: true,
      data: req.user
      ,message: "User fetched successfully",});
    });

export default router;