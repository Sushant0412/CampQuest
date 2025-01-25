import React from "react";
import Navbar from "../partials/Navbar"; // Import your Navbar component
import Footer from "../partials/Footer"; // Import your Footer component

const Login = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center mt-5">
        <div className="w-full max-w-sm">
          <div className="card shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt="Login-img"
              className="w-full h-48 object-cover"
            />
            <div className="card-body p-6">
              <h5 className="text-2xl font-semibold mb-4">Login</h5>
              <form action="/login" method="POST" className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="username"
                    name="username"
                    autoFocus
                    required
                  />
                  <div className="text-sm text-green-600 mt-1">Looks good!</div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium"
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
