import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { isLoggedIn, isReviewAuthor } from "../middleware.js";
import { validateReview } from "../middleware.js";
import { createReview, deleteReview } from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.post("/", validateReview, isLoggedIn, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

export default router;
