import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbCon.js";
import authRoutes from "./Routes/authRoutes.js";
import mlRoutes from "./Routes/mlRoutes.js";

const app = express();
dotenv.config();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ml", mlRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    status,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
