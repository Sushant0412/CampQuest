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

// Function to update Excel file with new campground
export const updateExcelWithNewCampground = async (campground, next) => {
  const filePath = "./analytics/campgrounds.xlsx"; // Path to your Excel file

  // Fetch the newly added campground with populated reviews
  const updatedCampground = await Campground.findById(campground._id).populate(
    "reviews"
  );

  // Calculate average rating for the first 10 reviews
  const ratings = updatedCampground.reviews
    .slice(0, 10)
    .map((review) => review.rating);
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
      : 0; // Default to 0 if there are no ratings

  // Create a new entry for the campground
  const newCampgroundData = {
    Name: updatedCampground.title,
    Location: updatedCampground.location,
    Rating: averageRating, // Use the calculated average rating
  };

  try {
    // Check if the Excel file already exists
    let wb;
    try {
      wb = xlsx.readFile(filePath);
    } catch (err) {
      // If file does not exist, create a new workbook
      wb = xlsx.utils.book_new();
    }

    // Get the sheet, or create one if it doesn't exist
    const sheetName = "Campgrounds";
    let ws = wb.Sheets[sheetName];

    if (!ws) {
      // If the sheet doesn't exist, create one
      ws = xlsx.utils.json_to_sheet([]); // Start with an empty array
      xlsx.utils.book_append_sheet(wb, ws, sheetName);
    }

    // Read existing data and append new campground
    const existingData = xlsx.utils.sheet_to_json(ws);
    existingData.push(newCampgroundData); // Add the new campground data

    // Update the sheet with the new data
    const updatedWs = xlsx.utils.json_to_sheet(existingData);
    wb.Sheets[sheetName] = updatedWs;

    // Write the updated workbook back to the file
    xlsx.writeFile(wb, filePath);
    console.log("Excel file updated successfully!");
  } catch (error) {
    console.error("Error updating Excel file:", error);
    next(error);
  }
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
