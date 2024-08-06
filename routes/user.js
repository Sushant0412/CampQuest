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

router.route("/register").get(renderRegister).post(catchAsync(register));

router
  .route("/login")
  .get(renderLogin)
  .post(
    catchReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    login
  );

router.get("/logout", logout);

export default router;
