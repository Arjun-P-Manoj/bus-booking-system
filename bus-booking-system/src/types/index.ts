export type UserType = 'Normal' | 'Elderly' | 'Pregnant' | 'Female';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  age?: number;
  isAdmin: boolean;
  role: "user" | "admin";
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
  type: "AC" | "Non-AC";
  amenities: string[];
}

export interface Seat {
  number: number;
  status: "available" | "booked" | "selected";
  price: number;
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
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}