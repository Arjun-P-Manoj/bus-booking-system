import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer transition-all duration-300 relative group">
                BusBooking
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-50 blur-xl -z-10 transition-all duration-300"></span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="relative group bg-transparent text-lg text-gray-700 hover:text-indigo-500 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-500 before:transition-all before:duration-300"
              >
                Home
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="relative group bg-transparent text-lg text-gray-700 hover:text-indigo-500 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-500 before:transition-all before:duration-300"
              >
                Available Buses
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-all duration-300"></span>
              </a>
              <button className="relative group bg-indigo-600 text-white px-8 py-3 text-lg rounded-lg hover:bg-indigo-500 hover:shadow-lg hover:scale-105 transition-all duration-300 transform before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-300 before:transition-all before:duration-300">
                Login
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-50 blur-xl -z-10 transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Book Your Bus Journey{" "}
              <span className="text-indigo-600">with Ease</span>
            </h1>
            <p className="text-lg text-gray-600">
              Experience comfortable and hassle-free bus travel with our easy
              booking system. Find the best routes and prices for your journey.
            </p>
            <div className="space-x-4 pt-2">
              <button className="relative group bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-300 before:transition-all before:duration-300">
                Get Started
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-50 blur-xl -z-10 transition-all duration-300"></span>
              </button>
              <button className="relative group border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-400 before:transition-all before:duration-300">
                Login
                <span className="absolute inset-0 rounded-lg bg-indigo-400 opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-all duration-300"></span>
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
              alt="Modern Bus"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-6 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best bus booking service with our premium features
              and customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group relative before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-500 before:transition-all before:duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
                Wide Network
              </h3>
              <p className="text-gray-600">
                Access to extensive routes across the country with multiple
                options for your journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group relative before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-500 before:transition-all before:duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Competitive pricing with special discounts and offers for
                frequent travelers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group relative before:content-[''] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:hover:border-indigo-500 before:transition-all before:duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700"
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
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
                Easy Booking
              </h3>
              <p className="text-gray-600">
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

export default App;
