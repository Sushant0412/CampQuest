import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  createCampground,
  deleteCampground,
  home,
  renderEditForm,
  renderNewForm,
  showCampground,
  updateCampground,
  approveCampground,
  revokeCampground,
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

router
  .route("/")
  .get(catchAsync(home))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(createCampground)
  );

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

router.post("/:id/approve", isAdmin, approveCampground);
router.post("/:id/revoke", isAdmin, revokeCampground);

export default router;
