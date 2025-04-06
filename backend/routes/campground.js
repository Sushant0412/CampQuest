import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  createCampground,
  deleteCampground,
  updateCampground,
  approveCampground,
  revokeCampground,
  home,
  getCampgroundById,
} from "../controllers/campgrounds.js";
import {
  isLoggedIn,
  isAuthor,
  validateCampground,
  isAdmin,
} from "../middleware.js";
import multer from "multer";
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

const router = express.Router();

router.route("/").get(catchAsync(home)).post(
  isLoggedIn,
  upload.array("image"),
  // validateCampground,
  catchAsync(createCampground)
);

router
  .route("/:id")
  .get(catchAsync(getCampgroundById))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.post("/:id/approve", isAdmin, approveCampground);
router.post("/:id/revoke", isAdmin, revokeCampground);

export default router;
