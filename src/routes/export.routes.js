import express from "express";
import { exportMonthlyExcel } from "../controllers/export.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/excel", protect, exportMonthlyExcel);

export default router;