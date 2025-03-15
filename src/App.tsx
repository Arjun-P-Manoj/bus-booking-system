import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BusListing from "./components/BusListing";
import { SeatSelection } from "./components/seat-selection/SeatSelection";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero Section */}
      <div className="pt-28 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Book Your Bus Journey{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                with Ease
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Experience comfortable and hassle-free bus travel with our easy
              booking system. Find the best routes and prices for your journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/signup"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-[15px] font-medium rounded-lg text-white overflow-hidden group w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
                <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
                <span className="relative">Get Started</span>
              </a>
              <a
                href="/login"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-[15px] font-medium rounded-lg overflow-hidden group bg-white w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full border-2 border-indigo-600 rounded-lg"></span>
                <span className="relative text-indigo-600 group-hover:text-indigo-500 transition-colors duration-200">
                  Login
                </span>
              </a>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent rounded-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
              alt="Modern Bus"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2">
              Why Choose Us?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best bus booking service with our premium features
              and customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Wide Network
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access to extensive routes across the country with multiple
                options for your journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Best Prices
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Competitive pricing with special discounts and offers for
                frequent travelers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simple and secure booking process with instant confirmation and
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buses" element={<BusListing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Dashboard />} />
          <Route path="/buses/:id/seats" element={<SeatSelection />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
