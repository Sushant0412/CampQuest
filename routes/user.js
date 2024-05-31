import express from "express";
const router = express.Router();
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
import { catchReturnTo } from "../middleware.js";

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  catchReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectURL = res.locals.returnTo || "/campgrounds";
    delete res.locals.returnTo;
    res.redirect(redirectURL);
  }
);

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "You've Successfully Logged in");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
});

export default router;
