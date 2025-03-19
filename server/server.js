import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbCon.js";
import authRoutes from "./Routes/authRoutes.js";
import mlRoutes from "./Routes/mlRoutes.js";
import itineraryRoutes from "./Routes/itineraryRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import Query from "./Models/queryModel.js";
import Feedback from "./Models/feedbackModel.js";

const app = express();
dotenv.config();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/users", userRoutes);

// Submit a New Query (User)
app.post("/api/queries", async (req, res) => {
  try {
    const { text, email } = req.body;
    if (!text || !email) return res.status(400).json({ error: "Text and email are required." });
    const newQuery = new Query({ text, email, response: "" });
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ error: "Failed to submit query." });
  }
});

// Fetch All Queries (Admin/User)
app.get("/api/queries", async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ error: "Failed to fetch queries." });
  }
});

// Fetch single user's Queries (User)
app.get("/api/queries/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ error: "Email parameter is required." });
    const userQueries = await Query.find({ email });
    res.status(200).json(userQueries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ error: "Failed to fetch queries." });
  }
});

// Admin Respond to Query
app.put("/api/queries/:id", async (req, res) => {
  try {
    const { response } = req.body;
    if (!response) return res.status(400).json({ error: "Response text is required." });
    const updatedQuery = await Query.findByIdAndUpdate(req.params.id, { response }, { new: true });
    if (!updatedQuery) return res.status(404).json({ error: "Query not found." });
    res.status(200).json(updatedQuery);
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ error: "Failed to update query response." });
  }
});

// Submit Feedback (User)
app.post("/api/feedback", async (req, res) => {
  try {
    const { message, email } = req.body;
    if (!message || !email) return res.status(400).json({ error: "Message and email are required." });
    const newFeedback = new Feedback({ message, email });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback." });
  }
});

// Fetch All Feedbacks (Users & Admin)
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}, "email message createdAt");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch feedbacks." });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
