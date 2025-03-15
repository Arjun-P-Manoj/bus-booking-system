import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface BusFeature {
  icon: string;
  label: string;
}

interface Bus {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  price: number;
  seatsLeft: number;
  features: BusFeature[];
}

const BusListing: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [availableBuses] = useState<Bus[]>([
    {
      id: "1",
      name: "Royal Travels Express",
      type: "AC Sleeper",
      departureTime: "21:00",
      arrivalTime: "09:00",
      from: "Bangalore",
      to: "Mumbai",
      price: 1200,
      seatsLeft: 24,
      features: [
        { icon: "📶", label: "WiFi" },
        { icon: "🔌", label: "USB Charging" },
        { icon: "🛏️", label: "Blanket" },
        { icon: "🚰", label: "Water Bottle" },
      ],
    },
    {
      id: "2",
      name: "Comfort Kings",
      type: "AC Semi Sleeper",
      departureTime: "20:30",
      arrivalTime: "08:30",
      from: "Bangalore",
      to: "Mumbai",
      price: 1000,
      seatsLeft: 18,
      features: [
        { icon: "📶", label: "WiFi" },
        { icon: "🔌", label: "USB Charging" },
        { icon: "🚰", label: "Water Bottle" },
      ],
    },
  ]);

  const [filteredBuses, setFilteredBuses] = useState<Bus[]>(availableBuses);

  const handleBookNow = (busId: string) => {
    navigate(`/buses/${busId}/seats`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = availableBuses.filter(
      (bus) =>
        bus.name.toLowerCase().includes(value) ||
        bus.from.toLowerCase().includes(value) ||
        bus.to.toLowerCase().includes(value) ||
        bus.type.toLowerCase().includes(value)
    );

    setFilteredBuses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search */}
        <div className="mb-12">
          <div className="max-w-3xl mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-3">
              Available Buses
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Find and book your perfect journey with our wide selection of
              routes
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search your bus
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by bus name, route, or type..."
                  className="w-full pl-12 pr-4 py-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 hover:bg-white transition-all duration-200 placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredBuses(availableBuses);
                    }}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-500">
                  {filteredBuses.length === 0
                    ? "No buses found"
                    : filteredBuses.length === 1
                    ? "1 bus found"
                    : `${filteredBuses.length} buses found`}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Type to start searching</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus Cards */}
        <div className="space-y-6">
          {filteredBuses.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No buses found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search term or check back later.
              </p>
            </div>
          ) : (
            filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
              >
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {bus.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {bus.type}
                      </span>
                    </div>
                    <div className="w-full lg:w-auto">
                      <div className="flex flex-col items-start lg:items-end">
                        <span className="text-xs sm:text-sm text-gray-500 mb-0.5">
                          Starting from
                        </span>
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                          ₹{bus.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6 w-full lg:w-auto">
                      <div className="flex flex-col items-start">
                        <span className="text-lg sm:text-xl font-semibold text-gray-900">
                          {bus.departureTime}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500">
                          {bus.from}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center px-2">
                        <div className="h-[2px] w-12 sm:w-16 bg-indigo-100"></div>
                        <svg
                          className="w-4 h-4 text-indigo-400 mx-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                        <div className="h-[2px] w-12 sm:w-16 bg-indigo-100"></div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-lg sm:text-xl font-semibold text-gray-900">
                          {bus.arrivalTime}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500">
                          {bus.to}
                        </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 w-full lg:w-auto justify-center">
                        <svg
                          className="w-3.5 h-3.5 mr-1.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {bus.seatsLeft} seats available
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {bus.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-1.5 rounded-md text-sm bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 border border-gray-100 hover:border-indigo-100"
                        >
                          <span className="mr-1.5">{feature.icon}</span>
                          {feature.label}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleBookNow(bus.id)}
                      className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg text-white overflow-hidden group w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
                      <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
                      <span className="relative">Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BusListing;
