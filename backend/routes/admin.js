import express from "express";
const router = express.Router();
import passport from "passport";
import catchAsync from "../utils/catchAsync.js";
import { isAdmin, isLoggedIn } from "../middleware.js";
import {
  adminLogin,
  adminLogout,
  renderAdminLogin,
  renderAdminRegister,
  adminRegister,
  showUnapprovedCampgrounds,
  
} from "../controllers/admin.js";

// Admin login route
router
  .route("/login")
  .get(renderAdminLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/admin/login",
    }),
    adminLogin
  );

router.get("/logout", adminLogout);

// Admin register route for testing purposes
router
  .route("/register")
  .get(renderAdminRegister)
  .post(catchAsync(adminRegister));

// Show all unapproved campgrounds for admin
router.get("/campgrounds", catchAsync(showUnapprovedCampgrounds));

export default router;
