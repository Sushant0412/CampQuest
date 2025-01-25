import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the review schema
const reviewSchema = new Schema({
  content: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
