import express from "express";
import catchAsync from "../utils/catchAsync.js";
import Campground from "../models/campground.js";
import {
  createCampground,
  deleteCampground,
  home,
  renderEditForm,
  renderNewForm,
  showCampground,
  updateCampground,
} from "../controllers/campgrounds.js";
import { isLoggedIn, isAuthor } from "../middleware.js";
import { validateCampground } from "../middleware.js";

const router = express.Router();

router.get("/", catchAsync(home));

router.get("/new", isLoggedIn, renderNewForm);

router.post("/", isLoggedIn, validateCampground, catchAsync(createCampground));

router.get("/:id", catchAsync(showCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

router.put(
  "/:id",
  validateCampground,
  isLoggedIn,
  isAuthor,
  catchAsync(updateCampground)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteCampground));

export default router;
