import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

const Home = ({ currentUser }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="text-white sticky top-0 z-10">
        <div className="max-w-full px-14 mx-auto py-3 flex justify-between items-center">
          <a to="/" className="text-white text-3xl font-semibold">
            CampQuest
          </a>
          <div className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className={`text-white hover:text-gray-300 ${
                window.location.pathname === "/" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/campgrounds"
              className={`text-white hover:text-gray-300 ${
                window.location.pathname === "/campgrounds"
                  ? "font-bold"
                  : ""
              }`}
            >
              Campgrounds
            </Link>
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className={`text-white hover:text-gray-300 ${
                    window.location.pathname === "/login"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-white hover:text-gray-300 ${
                    window.location.pathname === "/register"
                      ? "font-bold"
                      : ""
                  }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                className={`text-white hover:text-gray-300 ${
                  window.location.pathname === "/logout"
                    ? "font-bold"
                    : ""
                }`}
              >
                Logout
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" aria-label="Toggle Menu">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center text-white relative">
        <h1 className="text-4xl font-bold mb-6">CampQuest</h1>
        <div className="text-md max-w-2xl mb-8 space-y-2">
          <p>Welcome to CampQuest Adventures!</p>
          <p>Dive into the excitement and discover our diverse campgrounds.</p>
          <p>
            Don't hesitate to share your own experiences and engage with the
            community!
          </p>
        </div>
        <a
          href="/campgrounds"
          className="bg-white text-black py-2 px-6 text-lg font-semibold rounded-md hover:bg-gray-100"
        >
          View Campgrounds
        </a>
      </main>

      {/* Footer */}
      <footer className="bg-transparent text-white py-3 mt-auto text-center">
        <p>© 2025 CampQuest. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
