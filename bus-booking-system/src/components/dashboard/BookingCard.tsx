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
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "pending":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      case "cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  const canCancel =
    booking.status === "confirmed" && new Date(booking.travelDate) > new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ring-1 ring-inset capitalize ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">#{booking.id}</div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Travel Date</p>
              <p className="text-sm text-gray-900 mt-1">
                {format(new Date(booking.travelDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Amount</p>
              <p className="text-sm text-blue-600 font-medium mt-1">
                ₹{booking.totalAmount}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Seat Numbers
            </p>
            <div className="flex flex-wrap gap-2">
              {booking.seatNumbers.map((seatNo) => (
                <span
                  key={seatNo}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"
                >
                  {seatNo}
                </span>
              ))}
            </div>
          </div>
          {canCancel && onCancel && (
            <div className="pt-2">
              <button
                onClick={() => onCancel(booking.id)}
                className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
