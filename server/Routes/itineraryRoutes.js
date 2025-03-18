import express from "express";
import Itinerary from "../Models/itineraryModel.js"; // Ensure correct import

const router = express.Router();

// Route to fetch all saved itineraries
router.get("/", async (req, res) => {  // Endpoint: /api/itinerary/
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).json({ error: "Failed to fetch itineraries" });
  }
});

// Route to save an itinerary
router.post("/save", async (req, res) => {  // Endpoint: /api/itinerary/save
  try {
    const { Preferred_Locations, Activities } = req.body;

    // Ensure Activities is stored as an array
    const activitiesArray = Array.isArray(Activities)
      ? Activities
      : Activities.split(", ").map((activity) => activity.trim());

    const newItinerary = new Itinerary({ Preferred_Locations, Activities: activitiesArray });

    await newItinerary.save();
    res.status(201).json({ message: "Itinerary saved successfully!" });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    res.status(500).json({ error: "Failed to save itinerary" });
  }
});

export default router;
