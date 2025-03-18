import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
 
  Preferred_Locations: { type: String, required: true },
  Activities: { type: [String], required: true }, // Ensure it's an array
});

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);
export default Itinerary;
