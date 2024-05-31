import mongoose from "mongoose";
import Review from "../models/review.js";
const { Schema } = mongoose;

const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    // rather than deleteMany we are removing reviews based on _id, actually deleteMany would also work and remove is deprecated
    // await Review.remove({
    //   _id: { $in: doc.reviews },
    // });
    console.log("Deleted campground:", doc);
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});

const Campground = mongoose.model("Campground", campgroundSchema);

export default Campground;
