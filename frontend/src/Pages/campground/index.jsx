import React, { useEffect, useState } from "react";
import axios from "axios";

const AllCampgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const mapboxToken =
    "pk.eyJ1Ijoic3VzaGFudDMwIiwiYSI6ImNtMjdkMzlidjBwc3IyaXM5bzVnNmJseTQifQ.BhnxquY7YYUV85E7XT - xOg";

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get("http://localhost:3000/"); // Replace with your API endpoint
        setCampgrounds(response.data.campgrounds);
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };

    fetchCampgrounds();
  }, []);

  return (
    <div>
      <div id="cluster-map" className="w-full h-96"></div>
      <h1 className="mt-6 text-3xl font-semibold text-center">
        All Campgrounds
      </h1>
      <div className="text-center mt-4">
        <a
          href="/campgrounds/new"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Campground
        </a>
      </div>
      <div className="mt-6 space-y-6">
        {campgrounds.map(
          (campground) =>
            campground.approved && (
              <div
                key={campground._id}
                className="card shadow-lg rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <img
                      crossOrigin="anonymous"
                      className="w-full h-48 object-cover"
                      alt=""
                      src={
                        campground.images.length
                          ? campground.images[0].url
                          : "https://res.cloudinary.com/dstqulozx/image/upload/v1717844643/CampQuest/r8ltrfojrdl5t45jqnps.jpg"
                      }
                    />
                  </div>
                  <div className="md:col-span-2 p-4">
                    <h5 className="text-xl font-bold">{campground.title}</h5>
                    <p className="text-gray-700 mt-2">
                      {campground.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <small>{campground.location}</small>
                    </p>
                    <a
                      href={`/campgrounds/${campground._id}`}
                      className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      View {campground.title}
                    </a>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          const mapboxToken = "${mapboxToken}";
          const campgrounds = {features: ${JSON.stringify(campgrounds)}};
        `,
        }}
      ></script>
      <script src="/js/mapsCluster.js"></script>
    </div>
  );
};

export default AllCampgrounds;
