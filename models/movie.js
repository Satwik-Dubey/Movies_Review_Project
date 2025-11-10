import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, text: true },
  genre: { type: String, required: true, text: true },
  year: { type: Number },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default mongoose.model("Movie", movieSchema);
