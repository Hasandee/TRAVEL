import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  email:{ type: String, required: true },
  Preferred_Locations: { type: String, required: true },
  Activities: { type: [String], required: true }, // Ensure it's an array
});

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);
export default Itinerary;
