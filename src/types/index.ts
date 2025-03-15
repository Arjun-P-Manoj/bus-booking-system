export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  userId: string;
  busId: string;
  seatNumbers: number[];
  bookingDate: string;
  travelDate: string;
  status: "confirmed" | "pending" | "cancelled";
  totalAmount: number;
  paymentStatus: "completed" | "pending" | "failed";
}

export interface Bus {
  id: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  totalSeats: number;
  availableSeats: number;
  type: string;
  amenities: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 