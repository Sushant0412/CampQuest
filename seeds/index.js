import mongoose from "mongoose";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
import Campground from "../models/campground.js";

mongoose
  .connect("mongodb://localhost:27017/CampQuest")
  .then()
  .catch((e) => {
    console.log(e);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    // Change the loop to add only 10 campgrounds
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    try {
      const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        images: [
          {
            url: "https://res.cloudinary.com/dstqulozx/image/upload/v1717406858/CampQuest/folihfihtf03u6riomo0.png",
            filename: "CampQuest/folihfihtf03u6riomo0",
          },
          {
            url: "https://res.cloudinary.com/dstqulozx/image/upload/v1717406877/CampQuest/ihoijb8jbdrco4zxt3zv.png",
            filename: "CampQuest/ihoijb8jbdrco4zxt3zv",
          },
        ],
        author: "6659aa8a0deb0a17a0920703",
        geometry: { coordinates: [72.900638, 19.069359], type: "Point" },
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
        price,
      });
      await camp.save();
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
    }
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
