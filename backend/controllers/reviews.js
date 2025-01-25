import Review from "../models/review.js";
import Campground from "../models/campground.js";
import { updateExcelWithAllCampgrounds } from "../middleware.js";

export const createReview = async (req, res) => {
  const review = new Review(req.body.review);
  const camp = await Campground.findById(req.params.id);
  review.author = req.user._id;
  camp.reviews.push(review);
  await review.save();
  await camp.save();
  await updateExcelWithAllCampgrounds();
  req.flash("success", "Review Created Successfully");
  res.redirect(`/campgrounds/${camp._id}`);
};

// Controller for deleting a review
export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const camp = await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  await updateExcelWithAllCampgrounds();
  req.flash("success", "Review Deleted Successfully");
  res.redirect(`/campgrounds/${id}`);
};
