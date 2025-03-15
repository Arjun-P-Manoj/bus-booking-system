import React from "react";

interface BookingSummaryProps {
  selectedSeats: Array<{
    id: string;
    number: string;
    type: string;
  }>;
  onConfirm: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSeats,
  onConfirm,
}) => {
  const calculateTotal = () => {
    // Mock prices - replace with actual pricing logic
    const basePrice = 500;
    const specialSeatPrice = 700;

    return selectedSeats.reduce((total, seat) => {
      return total + (seat.type === "regular" ? basePrice : specialSeatPrice);
    }, 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Booking Summary
      </h2>

      {selectedSeats.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No seats selected yet
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {selectedSeats.map((seat) => (
              <div
                key={seat.id}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Seat {seat.number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {seat.type} seat
                  </p>
                </div>
                <p className="text-gray-900 dark:text-white">
                  ₹{seat.type === "regular" ? "500" : "700"}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">
                Total
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                ₹{calculateTotal()}
              </p>
            </div>

            <button
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 dark:ring-offset-gray-900"
            >
              Confirm Booking
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              By confirming, you agree to our terms and conditions
            </p>
          </div>
        </>
      )}
    </div>
  );
};
