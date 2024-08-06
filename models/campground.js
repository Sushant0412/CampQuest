import mongoose from "mongoose";
import Review from "../models/review.js";
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

campgroundSchema.virtual("properties.popUpMarkUp").get(function () {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
  <p>${this.description.substring(0, 20)}...</p>`;
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
