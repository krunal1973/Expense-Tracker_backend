import { body, query, param } from "express-validator";

export const createTransactionValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .optional()
    .trim(),

  body("note")
    .optional()
    .trim(),
];

export const updateTransactionValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid transaction ID"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
];

export const getTransactionValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];