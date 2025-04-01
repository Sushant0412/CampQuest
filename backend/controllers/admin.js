// controllers/admin.js
import Campground from "../models/campground.js";
import User from "../models/user.js";

export const renderAdminLogin = (req, res) => {
  res.render("admin/login");
};

export const adminLogin = (req, res) => {
  if (req.user.isAdmin) {
    req.session.isAdmin = true;
    res.json({
      success: true,
      isAdmin: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    req.session.isAdmin = false;
    res.json({
      success: false,
      message: "You are not authorized to access this page.",
    });
  }
};

export const adminLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.isAdmin = false;
    res.clearCookie("isAdmin");
    req.flash("success", "Logged out successfully.");
    res.redirect("/");
  });
};

export const renderAdminRegister = (req, res) => {
  res.render("admin/register");
};

export const adminRegister = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      isAdmin: true,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.session.isAdmin = true;
      res.json({
        success: true,
        isAdmin: true,
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

export const showUnapprovedCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("admin/campgrounds", { campgrounds });
};
