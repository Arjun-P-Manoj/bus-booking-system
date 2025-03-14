# Bus Booking System

A modern web application for booking bus tickets, built with React, TypeScript, and Tailwind CSS.

## Features

- User-friendly interface for booking bus tickets
- Responsive design that works on all devices
- Secure authentication system
- Easy-to-use booking process

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository

```bash
git clone [your-repository-url]
cd bus-booking-system
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
bus-booking-system/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── styles/        # Global styles
│   ├── context/       # React context
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## Features in Detail

### User Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Password reset functionality

### Bus Search

- Search buses by source, destination, and date
- Filter by bus type (AC/Non-AC)
- Sort by price, departure time, or duration
- View available seats and amenities

### Seat Selection

- Interactive seat layout
- Real-time seat availability
- Multiple seat selection (up to 6 seats)
- Seat type indicators

### Payment Processing

- Secure payment integration with Razorpay
- Multiple payment methods support
- Order summary before payment
- Payment status tracking

### Booking Management

- View upcoming, completed, and cancelled bookings
- Cancel bookings with refund processing
- Download booking details
- Email notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.dev)
- [React Router](https://reactrouter.com)
- [Razorpay](https://razorpay.com)
