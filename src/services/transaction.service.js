import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import ApiError from "../utils/ApiError.js";

export const createTransaction = async (userId, data) => {
  return await Transaction.create({
    user: userId,
    ...data,
  });
};

export const getTransactions = async (userId, queryParams) => {
  const {
    page = 1,
    limit = 10,
    type,
    category,
    startDate,
    endDate,
    sort = "-date",
  } = queryParams;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const query = { user: userId };

  if (type) query.type = type;
  if (category) query.category = category;

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNumber);

  const total = await Transaction.countDocuments(query);

  return {
    transactions,
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber),
  };
};

export const updateTransaction = async (userId, transactionId, data) => {
  const transaction = await Transaction.findOne({
    _id: transactionId,
    user: userId,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  const allowedUpdates = ["title", "amount", "type", "category", "note", "date"];

  allowedUpdates.forEach((field) => {
    if (data[field] !== undefined) {
      transaction[field] = data[field];
    }
  });

  await transaction.save();

  return transaction;
};

export const deleteTransaction = async (userId, transactionId) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: transactionId,
    user: userId,
  });

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return transaction;
};

export const getSummary = async (userId) => {
  const summary = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach((item) => {
    if (item._id === "income") totalIncome = item.totalAmount;
    if (item._id === "expense") totalExpense = item.totalAmount;
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
};

export const getCategoryBreakdown = async (userId) => {
  return await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { totalAmount: -1 },
    },
  ]);
};