import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { useApi } from "../hooks/useApi";
import { Booking } from "../types";
import { Notification } from "../components/ui/Notification";
import { BookingCard } from "../components/dashboard/BookingCard";

export function Bookings() {
  const { request, loading } = useApi();
  const [bookings, setBookings] = useState<Booking[]>([]);
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
  const mockBookings: Booking[] = [
    {
      id: "1",
      userId: "user1",
      busId: "bus1",
      seatNumbers: [1, 2],
      bookingDate: new Date().toISOString(),
      travelDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "confirmed",
      totalAmount: 1600,
      paymentStatus: "completed",
    },
    {
      id: "2",
      userId: "user1",
      busId: "bus2",
      seatNumbers: [15],
      bookingDate: new Date().toISOString(),
      travelDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
      totalAmount: 800,
      paymentStatus: "pending",
    },
    {
      id: "3",
      userId: "user1",
      busId: "bus3",
      seatNumbers: [8, 9, 10],
      bookingDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      travelDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "confirmed",
      totalAmount: 2400,
      paymentStatus: "completed",
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      // In a real app, this would be an API call
      // const response = await request<Booking[]>({
      //   url: "/bookings",
      // });
      // if (response.success && response.data) {
      //   setBookings(response.data);
      // }
      setBookings(mockBookings);
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      // In a real app, this would be an API call
      // await request({
      //   url: `/bookings/${bookingId}/cancel`,
      //   method: "POST",
      // });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" as const }
            : booking
        )
      );

      setNotification({
        show: true,
        type: "success",
        message:
          "Booking cancelled successfully. Refund will be processed soon.",
      });
    } catch (error) {
      setNotification({
        show: true,
        type: "error",
        message: "Failed to cancel booking. Please try again.",
      });
    }
  };

  const filterBookings = (status: Booking["status"]) => {
    return bookings.filter((booking) => booking.status === status);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-5">
              <h1 className="text-2xl font-semibold text-gray-900">
                My Bookings
              </h1>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-5">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Bookings
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterBookings("confirmed").length > 0 ? (
                  filterBookings("confirmed").map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancelBooking}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-12">
                    <p className="text-gray-500 text-center">
                      No upcoming bookings found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pending Bookings */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-5">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Pending Bookings
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterBookings("pending").length > 0 ? (
                  filterBookings("pending").map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancelBooking}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-12">
                    <p className="text-gray-500 text-center">
                      No pending bookings found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cancelled Bookings */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-5">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cancelled Bookings
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterBookings("cancelled").length > 0 ? (
                  filterBookings("cancelled").map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-12">
                    <p className="text-gray-500 text-center">
                      No cancelled bookings found
                    </p>
                  </div>
                )}
              </div>
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
    </Layout>
  );
}
