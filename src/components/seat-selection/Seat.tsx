import React from "react";
import { motion } from "framer-motion";

interface SeatProps {
  seat: {
    id: string;
    number: string;
    status: "available" | "booked" | "special" | "allocated";
    type: "regular" | "elderly" | "pregnant" | "female";
  };
  isSelected: boolean;
  onSelect: () => void;
}

export const Seat: React.FC<SeatProps> = ({ seat, isSelected, onSelect }) => {
  const getSeatColor = () => {
    if (isSelected)
      return "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500";
    if (seat.status === "allocated")
      return "bg-indigo-100 border-indigo-300 text-indigo-700 cursor-not-allowed";
    if (seat.status === "booked")
      return "bg-red-50 border-red-200 cursor-not-allowed text-red-700";
    if (seat.type !== "regular")
      return "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700";
    return "bg-green-50 border-green-200 hover:bg-green-100 text-green-700";
  };

  const getIconColor = () => {
    if (isSelected) return "text-white";
    if (seat.status === "allocated") return "text-indigo-700";
    if (seat.status === "booked") return "text-red-700";
    if (seat.type !== "regular") return "text-amber-700";
    return "text-green-700";
  };

  const getSeatIcon = () => {
    switch (seat.type) {
      case "elderly":
        return (
          <svg
            className={`w-4 h-4 ${getIconColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "pregnant":
        return (
          <svg
            className={`w-4 h-4 ${getIconColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "female":
        return (
          <svg
            className={`w-4 h-4 ${getIconColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.button
      whileHover={{
        scale:
          seat.status === "booked" || seat.status === "allocated" ? 1 : 1.05,
      }}
      whileTap={{
        scale:
          seat.status === "booked" || seat.status === "allocated" ? 1 : 0.95,
      }}
      onClick={
        seat.status !== "booked" && seat.status !== "allocated"
          ? onSelect
          : undefined
      }
      className={`
        relative w-14 h-14 rounded-xl shadow-sm border
        ${getSeatColor()}
        transition-all duration-200 ease-in-out
        flex flex-col items-center justify-center
        group
      `}
      disabled={seat.status === "booked" || seat.status === "allocated"}
    >
      <span
        className={`absolute -top-5 text-xs font-medium ${
          isSelected ? "text-indigo-600" : "text-green-600"
        } group-hover:text-indigo-600 transition-colors`}
      >
        {seat.number}
      </span>

      {/* Seat Icon */}
      <div className="relative">
        <svg
          className={`w-8 h-8 ${getIconColor()}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 13v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3"
          />
        </svg>

        {/* Type indicator */}
        {seat.type !== "regular" && (
          <div className="absolute -right-1 -bottom-1">{getSeatIcon()}</div>
        )}
      </div>
    </motion.button>
  );
};
