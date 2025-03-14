import { useState } from "react";
import { PublicLayout } from "../components/layout/PublicLayout";
import { Bus } from "../types";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

export function Search() {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const [searchParams, setSearchParams] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [buses, setBuses] = useState<Bus[]>([]);
  const [searched, setSearched] = useState(false);

  // Mock data for demonstration
  const mockBuses: Bus[] = [
    {
      id: "1",
      name: "Express Deluxe",
      source: "Mumbai",
      destination: "Pune",
      departureTime: "2024-03-20T08:00:00Z",
      arrivalTime: "2024-03-20T11:00:00Z",
      fare: 800,
      totalSeats: 40,
      availableSeats: 25,
      type: "AC",
      amenities: ["WiFi", "USB Charging", "Water Bottle"],
    },
    {
      id: "2",
      name: "Night Rider",
      source: "Mumbai",
      destination: "Pune",
      departureTime: "2024-03-20T22:00:00Z",
      arrivalTime: "2024-03-21T01:00:00Z",
      fare: 600,
      totalSeats: 40,
      availableSeats: 35,
      type: "Non-AC",
      amenities: ["Water Bottle", "Blanket"],
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    // const response = await request<Bus[]>({
    //   url: "/buses/search",
    //   method: "POST",
    //   body: JSON.stringify(searchParams),
    // });
    // if (response.success && response.data) {
    //   setBuses(response.data);
    // }
    setBuses(mockBuses);
    setSearched(true);
  };

  const handleBooking = (busId: string) => {
    navigate(`/booking/${busId}`);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDuration = (departure: string, arrival: string) => {
    const diff = new Date(arrival).getTime() - new Date(departure).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <PublicLayout>
      <div className="space-y-6">
        {/* Search Form */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="source"
                    className="block text-sm font-medium text-gray-700"
                  >
                    From
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={searchParams.source}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        source: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700"
                  >
                    To
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={searchParams.date}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Search Buses"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Search Results */}
        {searched && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Available Buses
              </h2>
              {buses.length > 0 ? (
                <div className="space-y-4">
                  {buses.map((bus) => (
                    <div
                      key={bus.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {bus.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{formatTime(bus.departureTime)}</span>
                            <span className="mx-2">→</span>
                            <span>{formatTime(bus.arrivalTime)}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {formatDuration(
                                bus.departureTime,
                                bus.arrivalTime
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {bus.type}
                            </span>
                            <span className="text-sm text-gray-500">
                              {bus.availableSeats} seats available
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bus.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-col items-end">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{bus.fare}
                          </span>
                          <button
                            onClick={() => handleBooking(bus.id)}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Select Seats
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No buses found for this route</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
