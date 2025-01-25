import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  return (
    <nav className="sticky top-0 bg-dark text-white">
      <div className="max-w-full mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link to="/" className="text-xl font-semibold">
              CampQuest
            </Link>

            {/* Toggle Button for Mobile */}
            <button
              className="lg:hidden text-white"
              type="button"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="text-md hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-400 hover:text-gray-300">
                Home
              </Link>
              <Link
                to="/campgrounds"
                className="text-gray-400 hover:text-gray-300"
              >
                All Campgrounds
              </Link>
              <Link
                to="/campgrounds/new"
                className="text-gray-400 hover:text-gray-300"
              >
                New Campground
              </Link>
            </div>
          </div>

          <div className="flex space-x-4">
            {!currentUser ? (
              <>
                <Link to="/login" className="text-gray-400 hover:text-gray-300">
                  Login
                </Link>
                <Link to="/register" className="text-gray-400 hover:text-gray-300">
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                className="text-white hover:text-gray-300"
                onClick={() => {
                  localStorage.removeItem("isAdmin");
                }}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
