import { Bus } from "../types";
import { addHours } from "date-fns";

const baseTime = new Date();

export interface Bus {
  id: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  type: string;
  availableSeats: number;
  amenities: string[];
}

export const mockBuses: Bus[] = [
  {
    id: "1",
    name: "Royal Travels Express",
    source: "Bangalore",
    destination: "Mumbai",
    departureTime: "21:00",
    arrivalTime: "09:00",
    fare: 1200,
    type: "AC Sleeper",
    availableSeats: 24,
    amenities: ["WiFi", "USB Charging", "Blanket", "Water Bottle"],
  },
  {
    id: "2",
    name: "City Connect",
    source: "Delhi",
    destination: "Jaipur",
    departureTime: "08:00",
    arrivalTime: "14:00",
    fare: 800,
    type: "AC Seater",
    availableSeats: 35,
    amenities: ["WiFi", "USB Charging", "Snacks"],
  },
  {
    id: "3",
    name: "Night Rider",
    source: "Chennai",
    destination: "Hyderabad",
    departureTime: "22:00",
    arrivalTime: "06:00",
    fare: 1000,
    type: "AC Sleeper",
    availableSeats: 18,
    amenities: ["WiFi", "USB Charging", "Blanket", "Pillow", "Water Bottle"],
  },
  {
    id: "4",
    name: "Coastal Rider",
    source: "Mumbai",
    destination: "Goa",
    departureTime: addHours(baseTime, 3).toISOString(),
    arrivalTime: addHours(baseTime, 10).toISOString(),
    fare: 1000,
    totalSeats: 45,
    availableSeats: 20,
    type: "AC",
    amenities: ["WiFi", "Entertainment System", "Snacks", "Washroom"],
  },
  {
    id: "5",
    name: "Heritage Line",
    source: "Agra",
    destination: "Jaipur",
    departureTime: addHours(baseTime, 4).toISOString(),
    arrivalTime: addHours(baseTime, 9).toISOString(),
    fare: 750,
    totalSeats: 38,
    availableSeats: 38,
    type: "AC",
    amenities: ["Tour Guide", "WiFi", "Water Bottle"],
  },
]; 