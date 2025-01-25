import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(null); // Update the state after logout
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CampQuest
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/campgrounds">
              All Campgrounds
            </Link>
            <Link className="nav-link" to="/campgrounds/new">
              New Campground
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            {!currentUser ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/logout" onClick={handleLogout}>
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
