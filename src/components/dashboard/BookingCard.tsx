import { format } from "date-fns";
import { Booking } from "../../types";

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-50 text-green-700 ring-1 ring-green-600/20";
      case "pending":
        return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20";
      case "cancelled":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20";
    }
  };

  const canCancel = (status: string, travelDate: string) => {
    return (
      status.toLowerCase() !== "cancelled" && new Date(travelDate) > new Date()
    );
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Status Badge */}
          <div className="flex justify-between items-start">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{booking.totalAmount}
            </span>
          </div>

          {/* Travel Details */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-gray-600">
                {format(new Date(booking.travelDate), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-gray-400"
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
              <span className="text-sm text-gray-600">
                Seat{booking.seatNumbers.length > 1 ? "s" : ""}{" "}
                {booking.seatNumbers.join(", ")}
              </span>
            </div>
          </div>

          {/* Cancel Button */}
          {canCancel(booking.status, booking.travelDate) && (
            <button
              onClick={() => onCancel(booking.id)}
              className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
