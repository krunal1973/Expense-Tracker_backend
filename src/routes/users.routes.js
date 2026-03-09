import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller.js";

import {
  updateProfileValidation,
  changePasswordValidation,
} from "../validations/user.validation.js";

const router = express.Router();

router.use(protect);

router.get("/me",getProfile);

router.put("/me",updateProfileValidation,validate,updateProfile);

router.put("/change-password",changePasswordValidation,validate,changePassword);

router.delete("/me",deleteAccount);

export default router;