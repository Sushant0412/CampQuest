// controllers/admin.js
import User from "../models/user.js";

export const renderAdminLogin = (req, res) => {
  res.render("admin/login");
};

export const adminLogin = (req, res) => {
  req.flash("success", "Welcome back, Admin!");
  res.redirect("/admin/campgrounds");
};

export const adminLogout = (req, res) => {
  req.logout(() => {
    req.flash("success", "Logged out successfully!");
    res.redirect("/admin/login");
  });
};

export const renderAdminRegister = (req, res) => {
  res.render("admin/register");
};

export const adminRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, isAdmin: true });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome Admin!");
      res.redirect("/admin/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/admin/register");
  }
};

export const showUnapprovedCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({ approved: false });
  res.render("admin/campgrounds", { campgrounds });
};

export const toggleApproval = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  campground.approved = !campground.approved;
  await campground.save();
  req.flash("success", "Campground approval status updated!");
  res.redirect("/admin/campgrounds");
};
