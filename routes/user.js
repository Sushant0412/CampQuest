import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
import { catchReturnTo } from "../middleware.js";
import {
  login,
  logout,
  register,
  renderLogin,
  renderRegister,
} from "../controllers/users.js";

router.get("/register", renderRegister);

router.get("/login", renderLogin);

router.post(
  "/login",
  catchReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  login
);

router.post("/register", catchAsync(register));

router.get("/logout", logout);

export default router;
