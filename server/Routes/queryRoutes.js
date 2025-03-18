import express from "express";
import Query from "../Models/queryModel.js";
import { authenticateUser } from "../server.js"; // Assuming the auth middleware is in server.js

const router = express.Router();

// Submit a New Query (User)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    const newQuery = new Query({
      text,
      response: "",
      userId: req.userId, // Associate query with the logged-in user
    });

    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ error: "Failed to submit query." });
  }
});

// Fetch Queries for Logged-in User
router.get("/", authenticateUser, async (req, res) => {
  try {
    const queries = await Query.find({ userId: req.userId }); // Fetch only queries for the logged-in user
    res.status(200).json(queries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ error: "Failed to fetch queries." });
  }
});

// Respond to a Query (Admin)
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    query.response = req.body.response; // Admin's response
    await query.save();
    res.status(200).json(query);
  } catch (error) {
    console.error("Error responding to query:", error);
    res.status(500).json({ error: "Failed to respond to query." });
  }
});

export default router;
