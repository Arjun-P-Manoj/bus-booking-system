import { useState } from "react";
import { AuthLayout } from "../components/layout/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { BookingCard } from "../components/dashboard/BookingCard";
import { Notification } from "../components/ui/Notification";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Booking } from "../types";

export function Dashboard() {
  const { user } = useAuth();
  const { request } = useApi();
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });

  // Mock data for demonstration
  const upcomingBookings: Booking[] = [
    {
      id: "1",
      userId: user?.id || "",
      busId: "bus1",
      seatNumbers: [1, 2],
      bookingDate: new Date().toISOString(),
      travelDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "confirmed",
      totalAmount: 1200,
      paymentStatus: "completed",
    },
    {
      id: "2",
      userId: user?.id || "",
      busId: "bus2",
      seatNumbers: [15],
      bookingDate: new Date().toISOString(),
      travelDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      totalAmount: 600,
      paymentStatus: "pending",
    },
  ];

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setNotification({
        show: true,
        type: "success",
        message:
          "Booking cancelled successfully. Refund will be processed in 3-5 business days.",
      });
    } catch (error) {
      setNotification({
        show: true,
        type: "error",
        message: "Failed to cancel booking. Please try again.",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md">
          <div className="px-6 py-8 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Find and book your next journey with ease
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/search"
            className="group bg-white shadow-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Book a Ticket
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Search and book your next journey
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/bookings"
            className="group bg-white shadow-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    My Bookings
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    View and manage your bookings
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/profile"
            className="group bg-white shadow-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your personal information
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-md">
          <div className="px-6 py-8 sm:px-8">
            <div className="border-b border-gray-100 pb-6 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Upcoming Bookings
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancelBooking}
                  />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-12">
                  <p className="text-gray-500 text-center text-lg">
                    No upcoming bookings found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Notification
          show={notification.show}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
        />
      </div>
    </AuthLayout>
  );
}
