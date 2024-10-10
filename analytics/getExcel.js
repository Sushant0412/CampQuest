// Required modules
import mongoose from "mongoose";
import xlsx from "xlsx";
import Campground from "../models/campground.js";

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sushant:helloworld@cluster0.usskidt.mongodb.net/CampQuest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust as needed
    socketTimeoutMS: 45000, // Adjust as needed
  }
);

// Function to create the Excel file with all campgrounds
async function createExcelFile() {
  try {
    const campgrounds = await Campground.find({}).populate("reviews"); // Fetch and populate reviews
    const data = campgrounds.map((camp) => {
      // Calculate the average rating for the first 10 reviews
      const ratings = camp.reviews.slice(0, 10).map((review) => review.rating); // Get ratings of the first 10 reviews
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
          : 0; // Default to 0 if there are no ratings

      return {
        Name: camp.title,
        Location: camp.location,
        Rating: averageRating, // Use the calculated average rating
      };
    });

    // Create a new workbook and add the data
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Campgrounds");

    // Write to Excel file
    xlsx.writeFile(wb, "campgrounds.xlsx");
    console.log("Excel file created successfully!");
  } catch (error) {
    console.error("Error creating Excel file:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to create the Excel file
createExcelFile();
