import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import { MapPin, PlusCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axiosInstance.get("/campgrounds");
        setCampgrounds(response.data);
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };

    fetchCampgrounds();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Discover Campgrounds
        </h1>
        <Link
          to="/campgrounds/new"
          className="mt-4 md:mt-0 inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Campground
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campgrounds
          .filter((campground) => campground.approved)
          .map((campground) => (
            <div
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              key={campground._id}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  alt={campground.title}
                  src={
                    campground.images.length
                      ? campground.images[0].url
                      : "https://res.cloudinary.com/dstqulozx/image/upload/v1717844643/CampQuest/r8ltrfojrdl5t45jqnps.jpg"
                  }
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {campground.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {campground.description}
                </p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm line-clamp-1">
                    {campground.location}
                  </span>
                </div>
                <Link
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 w-full"
                  to={`/campgrounds/${campground._id}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
