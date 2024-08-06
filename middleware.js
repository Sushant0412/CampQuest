import { campgroundSchema, reviewSchema } from "./schemas.js";
import ExpressError from "./utils/ExpressError.js";
import Campground from "./models/campground.js";
import Review from "./models/review.js";

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    console.log("admin is logged in");
    return next();
  }
  req.flash("error", "You do not have permission to do that.");
  res.redirect("/login");
};

const catchReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const isAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You don't have the permission");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You don't have the permission");
    return res.redirect(`/campgrounds/${req.params.id}`);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export {
  isLoggedIn,
  catchReturnTo,
  isAuthor,
  isAdmin,
  validateCampground,
  validateReview,
  isReviewAuthor,
};
