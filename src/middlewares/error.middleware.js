// src/middlewares/error.middleware.js

import ApiError from "../utils/ApiError.js";

function errorMiddleware(err, req, res, next) {
  // Ensure it's always an ApiError
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
}

export default errorMiddleware;