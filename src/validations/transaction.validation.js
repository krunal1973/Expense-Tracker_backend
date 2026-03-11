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
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("note")
    .optional()
    .trim()
    .isString()
    .withMessage("Note must be a string"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be valid"),
];

export const updateTransactionValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid transaction ID"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  body("note")
    .optional()
    .trim()
    .isString()
    .withMessage("Note must be a string"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be valid"),
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

  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  query("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string"),

  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be valid"),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be valid"),

  query("sort")
    .optional()
    .isString()
    .withMessage("Sort must be a string"),
];