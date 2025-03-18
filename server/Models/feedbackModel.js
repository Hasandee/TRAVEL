import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },  // Include email field
  message: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
