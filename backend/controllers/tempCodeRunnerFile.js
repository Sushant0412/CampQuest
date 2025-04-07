export const deleteCampground = async (req, res) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    
    if (!campground) {
      return res.status(404).json({ error: "Campground not found" });
    }
    
    await Campground.findByIdAndDelete(id);
    await updateExcelWithAllCampgrounds();
    
    return res.status(200).json({
      success: true,
      message: "Campground successfully deleted"
    });
};