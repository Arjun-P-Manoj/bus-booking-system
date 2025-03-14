import { Booking } from "../../types";
import { format } from "date-fns";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canCancel =
    booking.status === "confirmed" && new Date(booking.travelDate) > new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">Booking ID: {booking.id}</div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Travel Date</p>
              <p className="text-sm text-gray-500">
                {format(new Date(booking.travelDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Amount</p>
              <p className="text-sm text-gray-500">₹{booking.totalAmount}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">Seat Numbers</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {booking.seatNumbers.map((seatNo) => (
                <span
                  key={seatNo}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {seatNo}
                </span>
              ))}
            </div>
          </div>
          {canCancel && onCancel && (
            <div className="mt-4">
              <button
                onClick={() => onCancel(booking.id)}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
