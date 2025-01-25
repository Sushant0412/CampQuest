import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../partials/Navbar"; // Assuming Navbar component is in the same folder
import Footer from "../partials/Footer"; // Assuming Footer component is in the same folder

const Register = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar currentUser={null} />

      <div className="flex justify-center items-center mt-6">
        <div className="w-full max-w-sm">
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt="Register-img"
              className="w-full h-48 object-cover"
            />
            <div className="card-body p-6">
              <h5 className="text-2xl font-semibold mb-4">Register</h5>
              <form action="/register" method="POST" className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="username"
                    name="username"
                    required
                    autoFocus
                  />
                  <div className="text-sm text-green-600 mt-1">Looks good!</div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                  <div className="text-sm text-green-600 mt-1">Looks good!</div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <div className="text-sm text-green-600 mt-1">Looks good!</div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
