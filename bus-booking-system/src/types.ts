export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  userType: string;
  isAdmin: boolean;
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