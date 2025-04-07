import Campground from "../models/campground.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
import { cloudinary } from "../cloudinary/index.js";
import xlsx from "xlsx";
import { updateExcelWithAllCampgrounds } from "../middleware.js";

export const home = async (req, res) => {
  const campgrounds = await Campground.find({ approved: true });
  res.json(campgrounds);
};

export const renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

export const createCampground = async (req, res, next) => {
  try {
    if (!req.body.campground || !req.body.campground.location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const geoData = await geocoder
      .forwardGeocode({
        query: req.body.campground.location,
        limit: 1,
      })
      .send();

    if (!geoData.body.features[0]) {
      return res.status(400).json({ error: "Invalid location provided" });
    }

    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    campground.author = req.user.id; // Use id from JWT token
    await campground.save();
    await updateExcelWithAllCampgrounds();

    return res.status(201).json({
      success: true,
      message:
        "Campground added successfully. It will be verified and added in 2-3 days.",
      campground: campground,
    });
  } catch (error) {
    console.error("Error creating campground:", error);
    return res.status(500).json({ error: "Failed to create campground" });
  }
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

// API endpoint to get a single campground by ID
export const getCampgroundById = async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");

    if (!campground) {
      return res.status(404).json({ error: "Campground not found" });
    }

    return res.status(200).json(campground);
  } catch (error) {
    console.error("Error fetching campground:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch campground details" });
  }
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
  try {
    const { id } = req.params;
    //console.log(req.body);

    const campground = await Campground.findByIdAndUpdate(
      id,
      {
        ...req.body.campground,
      },
      { new: true }
    );

    if (!campground) {
      return res.status(404).json({ error: "Campground not found" });
    }

    if (req.files && req.files.length > 0) {
      const imgs = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
      campground.images.push(...imgs);
    }

    await campground.save();

    if (req.body.deleteImages && req.body.deleteImages.length > 0) {
      for (let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
      }
      await campground.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImages } } },
      });
    }

    await updateExcelWithAllCampgrounds();

    return res.status(200).json({
      success: true,
      message: "Campground successfully updated",
      campground: campground,
    });
  } catch (error) {
    console.error("Error updating campground:", error);
    return res.status(500).json({ error: "Failed to update campground" });
  }
};

export const deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  await Campground.findByIdAndDelete(id);
  await updateExcelWithAllCampgrounds();
  req.flash("success", "Camp Successfully Deleted");
  res.redirect("/campgrounds");
};

export const approveCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  console.log(campground);
  campground.approved = true;
  await campground.save();
  req.flash("success", "Campground approved.");
  res.redirect("/admin/campgrounds");
};

export const revokeCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  campground.approved = false;
  await campground.save();
  req.flash("success", "Campground revoked.");
  res.redirect("/admin/campgrounds");
};
