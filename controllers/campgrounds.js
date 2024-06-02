import Campground from "../models/campground.js";

export const home = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

export const renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

export const createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  //campground.image = 
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully Created a new Camp");
  res.redirect(`/campgrounds/${campground._id}`);
};

export const showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground Not Found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

export const renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Camp doesn't exist");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

export const updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  if (!campground) {
    req.flash("error", "Camp doesn't exist");
    return res.redirect("/campgrounds");
  }
  req.flash("success", "Camp Successfully Updated");
  res.redirect(`/campgrounds/${campground._id}`);
};

export const deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Camp Successfully Deleted");
  res.redirect("/campgrounds");
};
