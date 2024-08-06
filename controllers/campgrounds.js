import Campground from "../models/campground.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
import { cloudinary } from "../cloudinary/index.js";

export const home = async (req, res) => {
  const campgrounds = await Campground.find({approved: true});
  res.render("campgrounds/index", { campgrounds });
};

export const renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

export const createCampground = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash(
    "success",
    "Campground added successfully. It will be verified and added in 2-3 days."
  );
  res.redirect("/campgrounds");
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
  //res.render("campgrounds/show", { campground });
  res.render("campgrounds/show", {
    campground,
    currentUser: req.user,
    isAdmin: req.user && req.user.isAdmin,
  });
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
  //console.log(req.body);

  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  console.log(campground);
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

export const approveCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  console.log(campground);
  //campground.isApproved = true;
  await campground.save();
  req.flash("success", "Campground approved.");
  res.redirect("/admin/campgrounds");
};

export const revokeCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  campground.isApproved = false;
  await campground.save();
  req.flash("success", "Campground revoked.");
  res.redirect("/admin/campgrounds");
};


