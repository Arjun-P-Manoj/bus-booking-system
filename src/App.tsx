import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BusListing from "./components/BusListing";
import { SeatSelection } from "./components/seat-selection/SeatSelection";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (for Login/Signup)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// AuthenticatedLayout Component
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <nav className="bg-white/95 backdrop-blur-lg shadow-sm fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 relative group"
              >
                BusBooking
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <Link
                to="/buses"
                className={`text-[15px] font-medium transition-all duration-200 relative group ${
                  location.pathname === "/buses"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                Available Buses
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                    location.pathname === "/buses" ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/dashboard"
                className={`text-[15px] font-medium transition-all duration-200 relative group ${
                  location.pathname === "/dashboard"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                Dashboard
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                    location.pathname === "/dashboard" ? "w-full" : ""
                  }`}
                ></span>
              </Link>
              <div className="flex items-center space-x-6">
                <span className="text-[15px] text-gray-600">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium rounded-lg text-white overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
                  <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
                  <span className="relative">Logout</span>
                </button>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-24 min-h-screen bg-gray-50">{children}</main>
    </div>
  );
};

function Home() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero Section */}
      <div className="pt-28 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Book Your Bus Journey{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                with Ease
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Experience comfortable and hassle-free bus travel with our easy
              booking system. Find the best routes and prices for your journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/signup"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-[15px] font-medium rounded-lg text-white overflow-hidden group w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
                <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
                <span className="relative">Get Started</span>
              </a>
              <a
                href="/login"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-[15px] font-medium rounded-lg overflow-hidden group bg-white w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full border-2 border-indigo-600 rounded-lg"></span>
                <span className="relative text-indigo-600 group-hover:text-indigo-500 transition-colors duration-200">
                  Login
                </span>
              </a>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent rounded-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
              alt="Modern Bus"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2">
              Why Choose Us?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the best bus booking service with our premium features
              and customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Wide Network
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access to extensive routes across the country with multiple
                options for your journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Best Prices
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Competitive pricing with special discounts and offers for
                frequent travelers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simple and secure booking process with instant confirmation and
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/buses"
            element={
              <div>
                <Nav />
                <BusListing />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/buses/:id/seats"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <SeatSelection />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
