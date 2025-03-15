import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "./layout/AuthLayout";

// Types
interface User {
  name: string;
  totalBookings: number;
  upcomingTrips: number;
}

interface Booking {
  id: string;
  busName: string;
  date: string;
  seatNumber: string;
  status: "Confirmed" | "Pending";
}

// Mock Data (Replace with API calls)
const mockUser: User = {
  name: "John Doe",
  totalBookings: 12,
  upcomingTrips: 2,
};

const mockBookings: Booking[] = [
  {
    id: "1",
    busName: "Royal Travels Express",
    date: "2024-03-25",
    seatNumber: "A12",
    status: "Confirmed",
  },
  {
    id: "2",
    busName: "Comfort Kings",
    date: "2024-03-28",
    seatNumber: "B15",
    status: "Pending",
  },
  {
    id: "3",
    busName: "Night Rider Express",
    date: "2024-04-01",
    seatNumber: "C08",
    status: "Confirmed",
  },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user: authUser } = useAuth();

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        const userResponse = await Promise.resolve(mockUser);
        const bookingsResponse = await Promise.resolve(mockBookings);

        setUser(userResponse);
        setBookings(bookingsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    setSelectedBooking(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancellation = async () => {
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBookings(bookings.filter((booking) => booking.id !== selectedBooking));
      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Welcome back, {authUser?.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-blue-600">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-700">
                  {user?.totalBookings}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-blue-600">Upcoming Trips</p>
                <p className="text-2xl font-bold text-blue-700">
                  {user?.upcomingTrips}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/buses"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-blue-100 hover:border-blue-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                    Book a Bus
                  </h3>
                  <p className="text-sm text-blue-600">
                    Find and book your next journey
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/bookings"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-blue-100 hover:border-blue-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                    My Bookings
                  </h3>
                  <p className="text-sm text-blue-600">
                    View and manage your bookings
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/profile"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-blue-100 hover:border-blue-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                    Profile
                  </h3>
                  <p className="text-sm text-blue-600">
                    View and update your details
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Recent Bookings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-blue-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {booking.busName}
                    </h3>
                    <p className="text-sm text-blue-600">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-blue-600">
                    Seat: {booking.seatNumber}
                  </div>
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Booking Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-red-600">
                        Cancel Booking
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Are you sure you want to cancel this booking? This
                          action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={confirmCancellation}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Keep Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Dashboard;
