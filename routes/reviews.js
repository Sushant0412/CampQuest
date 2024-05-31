import express from "express";
import catchAsync from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import Review from "../models/review.js";
import ExpressError from "../utils/ExpressError.js";
import { reviewSchema } from "../schemas.js";
import { isLoggedIn } from "../middleware.js";

const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  isLoggedIn,
  catchAsync(async (req, res) => {
    const review = new Review(req.body.review);
    const camp = await Campground.findById(req.params.id);
    //console.log(review);
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash("success", "Review Created Succesfully");
    res.redirect(`/campgrounds/${camp._id}`);
    //res.send("Post Works");
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    // pull is a command in mongo to remove all entries in an array having that value
    const camp = await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Succesfully");
    res.redirect(`/campgrounds/${id}`);
  })
);

export default router;
