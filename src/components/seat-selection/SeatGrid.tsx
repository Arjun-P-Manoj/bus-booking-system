import React from "react";
import { Seat } from "./Seat";

interface SeatGridProps {
  seats: Array<{
    id: string;
    number: string;
    status: "available" | "booked" | "special" | "allocated";
    type: "regular" | "elderly" | "pregnant" | "female";
    position: {
      row: number;
      column: number;
    };
  }>;
  selectedSeats: Array<{
    id: string;
    number: string;
    status: string;
    type: string;
  }>;
  onSeatSelect: (seat: any) => void;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  selectedSeats,
  onSeatSelect,
}) => {
  // Group seats by row
  const seatRows = seats.reduce((acc, seat) => {
    const row = seat.position.row;
    if (!acc[row]) acc[row] = [];
    acc[row][seat.position.column] = seat;
    return acc;
  }, {} as { [key: number]: typeof seats });

  const legendItems = [
    {
      status: "available",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      label: "Available",
    },
    {
      status: "booked",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      label: "Booked",
    },
    {
      status: "special",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      label: "Special",
    },
    {
      status: "selected",
      bgColor: "bg-indigo-600",
      borderColor: "border-indigo-500",
      textColor: "text-white",
      label: "Selected",
    },
    {
      status: "allocated",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-700",
      label: "Allocated",
    },
  ];

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Bus front indicator */}
      <div className="mb-10">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
            <div className="w-32 h-16 border-2 border-green-200 rounded-t-3xl bg-green-50 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {legendItems.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div
                className={`w-4 h-4 ${item.bgColor} border ${item.borderColor} rounded-md mr-3`}
              ></div>
              <span className={`text-sm font-medium ${item.textColor}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Grid */}
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 rotate-90">
          <span className="text-sm font-medium text-green-600 tracking-wider">
            FRONT
          </span>
        </div>

        <div className="space-y-6">
          {Object.values(seatRows).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center space-x-6"
            >
              {/* Left side seats */}
              <div className="flex space-x-6">
                {row.slice(0, 2).map((seat) => (
                  <Seat
                    key={seat.id}
                    seat={seat}
                    isSelected={selectedSeats.some((s) => s.id === seat.id)}
                    onSelect={() => onSeatSelect(seat)}
                  />
                ))}
              </div>

              {/* Aisle */}
              <div className="w-20 h-14 flex items-center justify-center">
                {rowIndex === Math.floor(Object.keys(seatRows).length / 2) && (
                  <span className="text-sm font-medium text-indigo-400 tracking-wider">
                    AISLE
                  </span>
                )}
              </div>

              {/* Right side seats */}
              <div className="flex space-x-6">
                {row.slice(2).map((seat) => (
                  <Seat
                    key={seat.id}
                    seat={seat}
                    isSelected={selectedSeats.some((s) => s.id === seat.id)}
                    onSelect={() => onSeatSelect(seat)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Driver's cabin */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <div className="w-24 h-20 border-2 border-green-200 rounded-xl bg-green-50 flex items-center justify-center shadow-sm">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-sm font-medium text-green-600 tracking-wider">
                Driver's Cabin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
