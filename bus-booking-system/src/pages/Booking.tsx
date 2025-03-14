import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Bus, Seat } from "../types";
import { useApi } from "../hooks/useApi";
import { Notification } from "../components/ui/Notification";

export function Booking() {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const [bus, setBus] = useState<Bus | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
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
  const mockBus: Bus = {
    id: "1",
    name: "Express Deluxe",
    source: "Mumbai",
    destination: "Pune",
    departureTime: "2024-03-20T08:00:00Z",
    arrivalTime: "2024-03-20T11:00:00Z",
    fare: 800,
    totalSeats: 40,
    availableSeats: 25,
    type: "AC",
    amenities: ["WiFi", "USB Charging", "Water Bottle"],
  };

  const generateMockSeats = (): Seat[] => {
    const mockSeats: Seat[] = [];
    for (let i = 1; i <= 40; i++) {
      mockSeats.push({
        number: i,
        status: Math.random() > 0.3 ? "available" : "booked",
        price: 800,
      });
    }
    return mockSeats;
  };

  useEffect(() => {
    const fetchBusDetails = async () => {
      // In a real app, this would be an API call
      // const response = await request<Bus>({
      //   url: `/buses/${busId}`,
      // });
      // if (response.success && response.data) {
      //   setBus(response.data);
      //   setSeats(generateSeatsFromBus(response.data));
      // }
      setBus(mockBus);
      setSeats(generateMockSeats());
    };

    fetchBusDetails();
  }, [busId]);

  const handleSeatClick = (seatNumber: number) => {
    const seat = seats.find((s) => s.number === seatNumber);
    if (!seat || seat.status === "booked") return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((num) => num !== seatNumber);
      }
      if (prev.length >= 6) {
        setNotification({
          show: true,
          type: "error",
          message: "You can select up to 6 seats only",
        });
        return prev;
      }
      return [...prev, seatNumber];
    });
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setNotification({
        show: true,
        type: "error",
        message: "Please select at least one seat",
      });
      return;
    }
    navigate("/payment", {
      state: {
        busId,
        selectedSeats,
        totalAmount: selectedSeats.length * (bus?.fare || 0),
      },
    });
  };

  if (!bus) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Bus Details */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900">{bus.name}</h1>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>{bus.source}</span>
              <span className="mx-2">→</span>
              <span>{bus.destination}</span>
              <span className="mx-2">•</span>
              <span>
                {new Date(bus.departureTime).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Seat Selection */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Select Seats
            </h2>

            {/* Seat Map Legend */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-100 border border-primary-500 rounded"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 border border-gray-400 rounded"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {seats.map((seat) => (
                <button
                  key={seat.number}
                  onClick={() => handleSeatClick(seat.number)}
                  disabled={seat.status === "booked"}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    seat.status === "booked"
                      ? "bg-gray-300 border border-gray-400 cursor-not-allowed"
                      : selectedSeats.includes(seat.number)
                      ? "bg-primary-100 border border-primary-500 text-primary-700"
                      : "bg-gray-100 border border-gray-300 hover:border-primary-500"
                  }`}
                >
                  {seat.number}
                </button>
              ))}
            </div>

            {/* Selected Seats Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected Seats:</p>
                  <p className="mt-1 text-lg font-medium">
                    {selectedSeats.length > 0
                      ? selectedSeats.sort((a, b) => a - b).join(", ")
                      : "None"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount:</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    ₹{selectedSeats.length * bus.fare}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleProceed}
                  disabled={selectedSeats.length === 0 || loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
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
    </Layout>
  );
}
