import mongoose from "mongoose";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
import Campground from "../models/campground.js";

mongoose
  .connect("mongodb+srv://sushant:hello@cluster0.usskidt.mongodb.net/SemV")
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
  console.log(cities.length);
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 936);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66b1bce4088a523404eeea80",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/sushanttulasi/image/upload/v1717844643/CampQuest/r8ltrfojrdl5t45jqnps.jpg",
          filename: "CampQuest/r8ltrfojrdl5t45jqnps",
        },
        {
          url: "https://res.cloudinary.com/sushanttulasi/image/upload/v1717844643/CampQuest/r8ltrfojrdl5t45jqnps.jpg",
          filename: "CampQuest/r8ltrfojrdl5t45jqnps",
        },
      ],
      approved: false, // Set approved to false
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
