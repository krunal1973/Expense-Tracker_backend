import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as transactionService from "../services/transaction.service.js";

export const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(
    req.user._id,
    req.body
  );

  res
    .status(201)
    .json(new ApiResponse(201, transaction, "Transaction created"));
});

export const getTransactions = asyncHandler(async (req, res) => {
  const result = await transactionService.getTransactions(
    req.user._id,
    req.query
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Transactions fetched"));
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.updateTransaction(
    req.user._id,
    req.params.id,
    req.body
  );

  res
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction updated"));
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  await transactionService.deleteTransaction(
    req.user._id,
    req.params.id
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "Transaction deleted"));
});

export const getSummary = asyncHandler(async (req, res) => {
  const summary = await transactionService.getSummary(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, summary, "Summary fetched"));
});

export const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const breakdown = await transactionService.getCategoryBreakdown(
    req.user._id
  );

  res
    .status(200)
    .json(new ApiResponse(200, breakdown, "Category breakdown fetched"));
});