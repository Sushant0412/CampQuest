import React from "react";
import { Link } from "react-router-dom";
import Footer from "./partials/Footer";
import Navbar from "./partials/Navbar";

const ErrorPage = ({ err }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow items-center justify-center">
        <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
          <div className="alert alert-danger border border-red-500 bg-red-100 text-red-800 p-4 rounded-md">
            <h4 className="text-xl font-bold mb-2">{err.message}</h4>
            {process.env.NODE_ENV !== "production" && (
              <pre className="text-sm whitespace-pre-wrap">{err.stack}</pre>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
