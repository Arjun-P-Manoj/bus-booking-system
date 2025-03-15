import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-sm fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 relative group"
            >
              BusBooking
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/"
              className={`text-[15px] font-medium transition-all duration-200 relative group ${
                isActive("/")
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                  isActive("/") ? "w-full" : ""
                }`}
              ></span>
            </Link>
            <Link
              to="/buses"
              className={`text-[15px] font-medium transition-all duration-200 relative group ${
                isActive("/buses")
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Available Buses
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                  isActive("/buses") ? "w-full" : ""
                }`}
              ></span>
            </Link>
            <Link
              to="/dashboard"
              className={`text-[15px] font-medium transition-all duration-200 relative group ${
                isActive("/dashboard")
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Dashboard
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                  isActive("/dashboard") ? "w-full" : ""
                }`}
              ></span>
            </Link>
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium rounded-lg text-white overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
              <span className="relative">Login</span>
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
