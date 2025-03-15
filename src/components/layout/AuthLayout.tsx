import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileMenu } from "./MobileMenu";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Available Buses", href: "/buses" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Login", href: "/login" }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-20">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link
                  to="/"
                  className="text-xl lg:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  BusBooking
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "border-blue-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:ml-6 md:flex md:items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : null}

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <MobileMenu navigation={navigation} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
