import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import * as transactionController from "../controllers/transaction.controller.js";

import {
  createTransactionValidation,
  updateTransactionValidation,
  getTransactionValidation,
} from "../validations/transaction.validation.js";

const router = express.Router();

router.use(protect);

router.post("/",createTransactionValidation,validate,transactionController.createTransaction);

router.get("/",getTransactionValidation,validate,transactionController.getTransactions);

router.get("/summary",transactionController.getSummary);

router.get("/breakdown",transactionController.getCategoryBreakdown);

router.patch("/:id",updateTransactionValidation,validate,transactionController.updateTransaction);

router.delete("/:id",transactionController.deleteTransaction);

export default router;