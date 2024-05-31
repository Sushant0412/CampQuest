import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: { type: Number, min: 0, max: 5 },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
