import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import exportRoutes from "./routes/export.routes.js";

const app = express();

// Global Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("combined"));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/export", exportRoutes);

app.use(errorMiddleware);

export default app;