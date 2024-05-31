import mongoose from "mongoose";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
import Campground from "../models/campground.js";
import axios from "axios";

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
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            query: "nature",
            client_id: "tYmAbv6yEGh2xDZg6-3YPupYIrY4tkACDQGTIg9AoL4",
            w: 800,
            h: 600,
          },
        }
      );
      const imageUrl = response.data.urls.regular;
      const camp = new Campground({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: imageUrl,
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
