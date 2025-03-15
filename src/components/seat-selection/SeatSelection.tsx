import React, { useState, useEffect } from "react";
import axios from "axios";
import { SeatGrid } from "./SeatGrid";
import { BookingSummary } from "./BookingSummary";
import { ConfirmationModal } from "./ConfirmationModal";
import { useParams, Link, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { Payment } from "./Payment";

// Types
interface Seat {
  id: string;
  number: string;
  status: "available" | "booked" | "special" | "allocated";
  type: "regular" | "elderly" | "pregnant" | "female";
  position: {
    row: number;
    column: number;
  };
}

interface User {
  id: string;
  age: number;
  gender: string;
  isPregnant?: boolean;
  isElderly?: boolean;
}

export const SeatSelection: React.FC = () => {
  const { id: busId } = useParams<{ id: string }>();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [allocatedSeats, setAllocatedSeats] = useState<string[]>([]);
  const [busDetails, setBusDetails] = useState({
    name: "Royal Travels Express",
    type: "AC Sleeper",
    from: "Bangalore",
    to: "Mumbai",
    date: "Mar 20, 2024",
    departureTime: "21:00",
  });
  const navigate = useNavigate();

  // Mock user data (replace with actual user context/auth)
  const currentUser: User = {
    id: "1",
    age: 30,
    gender: "male",
    isElderly: false,
    isPregnant: false,
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        // Mock API call - replace with actual endpoint
        const response = await axios.get(`/api/buses/${busId}/seats`);
        setSeats(response.data);
      } catch (err) {
        setError("Failed to load seats. Please try again.");
        // For development, use mock data
        setSeats(getMockSeats());
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busId]);

  const handleSeatSelect = (seat: Seat) => {
    if (seat.status === "booked" || seat.status === "allocated") {
      setError("This seat is already taken");
      return;
    }

    if (!isEligibleForSeat(seat)) {
      setError("You are not eligible for this seat type");
      return;
    }

    if (!isValidAdjacentSeat(seat)) {
      setError("This seat selection violates adjacent seat rules");
      return;
    }

    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      }
      return [...prev, seat];
    });
    setError(null);
  };

  const isEligibleForSeat = (seat: Seat): boolean => {
    if (seat.type === "elderly" && !currentUser.isElderly) return false;
    if (seat.type === "pregnant" && !currentUser.isPregnant) return false;
    if (seat.type === "female" && currentUser.gender !== "female") return false;
    return true;
  };

  const isValidAdjacentSeat = (seat: Seat): boolean => {
    const adjacentSeats = getAdjacentSeats(seat);
    return !adjacentSeats.some((adjSeat) => {
      const bookedUser = getBookedUserForSeat(adjSeat);
      if (!bookedUser) return false;
      const ageDiff = Math.abs(currentUser.age - bookedUser.age);
      return bookedUser.gender !== currentUser.gender && ageDiff < 10;
    });
  };

  const handlePaymentComplete = async () => {
    try {
      setLoading(true);
      // Update seats status to allocated
      const updatedSeats = seats.map((seat) => ({
        ...seat,
        status: selectedSeats.some((selected) => selected.id === seat.id)
          ? "allocated"
          : seat.status,
      }));

      setSeats(updatedSeats);
      setAllocatedSeats((prev) => [
        ...prev,
        ...selectedSeats.map((seat) => seat.id),
      ]);

      // Simulate API call to update seat status
      await axios.post(`/api/buses/${busId}/seats/allocate`, {
        seatIds: selectedSeats.map((seat) => seat.id),
        userId: currentUser.id,
      });

      // Navigate to booking confirmation
      navigate(`/booking-confirmation/${busId}`, {
        state: {
          seats: selectedSeats,
          busDetails,
          totalAmount: calculateTotal(),
        },
      });
    } catch (error) {
      setError("Failed to allocate seats. Please try again.");
    } finally {
      setLoading(false);
      setShowPayment(false);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const basePrice = 500; // Base price for regular seats
      const specialPrice = 750; // Price for special seats
      return total + (seat.type === "regular" ? basePrice : specialPrice);
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-gray-600">Loading seat layout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Bus Details Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/buses"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  {busDetails.name}
                </h1>
                <span className="px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-full">
                  {busDetails.type}
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>
                  {busDetails.from} → {busDetails.to}
                </span>
                <span>•</span>
                <span>{busDetails.date}</span>
                <span>•</span>
                <span>{busDetails.departureTime}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Selected:{" "}
                <span className="font-medium text-gray-900">
                  {selectedSeats.length} seats
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
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
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Select Your Seats
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Click on an available seat to select it. Selected seats will be
                highlighted.
              </p>
            </div>
            <div className="p-6">
              <SeatGrid
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
              />
            </div>
          </div>
          <div>
            <BookingSummary
              selectedSeats={selectedSeats}
              onConfirm={() => setShowPayment(true)}
            />
          </div>
        </div>
      </div>

      {showPayment && (
        <Payment
          selectedSeats={selectedSeats}
          totalAmount={calculateTotal()}
          onPaymentComplete={handlePaymentComplete}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};

// Mock data generator
const getMockSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 8;
  const columns = 4;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const id = `${row}-${col}`;
      const seat: Seat = {
        id,
        number: `${row + 1}${String.fromCharCode(65 + col)}`,
        status: Math.random() > 0.3 ? "available" : "booked",
        type: "regular",
        position: { row, column: col },
      };

      // Add special seats
      if (row < 2) seat.type = "elderly";
      if (row === rows - 1) seat.type = "pregnant";
      if (col === columns - 1) seat.type = "female";

      seats.push(seat);
    }
  }

  return seats;
};

// Helper functions
const getAdjacentSeats = (seat: Seat): Seat[] => {
  // Implementation depends on your seat layout
  return [];
};

const getBookedUserForSeat = (seat: Seat): User | null => {
  // Implementation depends on your booking data
  return null;
};
