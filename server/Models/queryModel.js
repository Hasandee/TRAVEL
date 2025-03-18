import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  text: { type: String, required: true },
  email:{ type: String, required: true },
  response: { type: String, default: "" },
});

export default mongoose.model("Query", querySchema);
