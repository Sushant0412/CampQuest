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
} from "../controllers/campgrounds.js";
import { isLoggedIn, isAuthor } from "../middleware.js";
import { validateCampground } from "../middleware.js";
import multer from "multer";
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

const router = express.Router();

router
  .route("/")
  .get(catchAsync(home))
  //.post(isLoggedIn, validateCampground, catchAsync(createCampground));
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("Hi");
  });

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .put(validateCampground, isLoggedIn, isAuthor, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

export default router;
