import { campgroundSchema, reviewSchema } from "./schemas.js";
import ExpressError from "./utils/ExpressError.js";
import Campground from "./models/campground.js";
import Review from "./models/review.js";
import xlsx from "xlsx";

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  next();
};



// Function to update the Excel file with all campgrounds
export const updateExcelWithAllCampgrounds = async () => {
  const filePath = "./analytics/campgrounds.xlsx"; // Path to your Excel file

  try {
    // Fetch all campgrounds with populated reviews
    const allCampgrounds = await Campground.find({}).populate("reviews");

    // Create an array to hold all campground data
    const campgroundsData = allCampgrounds.map((campground) => {
      // Sort the reviews by rating in descending order and take the first 10 reviews
      const ratings = campground.reviews
        .sort((a, b) => b.rating - a.rating) // Sort reviews in descending order
        .slice(0, 10)
        .map((review) => review.rating);

      // Calculate the average rating
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
          : 0; // Default to 0 if there are no ratings

      // Create the campground data object
      return {
        Name: campground.title,
        Location: campground.location,
        Rating: averageRating, // Use the calculated average rating
      };
    });

    // Sort campgrounds by the average rating in descending order
    campgroundsData.sort((a, b) => b.Rating - a.Rating);

    // Create a new workbook and add the sheet with campground data
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(campgroundsData);

    // Append the new sheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, "Campgrounds");

    // Write the updated workbook back to the file
    xlsx.writeFile(wb, filePath);
    console.log("Excel file updated with all campgrounds successfully!");
  } catch (error) {
    console.error("Error updating Excel file with all campgrounds:", error);
  }
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
