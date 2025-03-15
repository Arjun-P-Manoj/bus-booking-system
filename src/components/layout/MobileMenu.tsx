import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavigationItem[];
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
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
        ) : (
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 998 }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="px-4 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-xl font-bold text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                BusBooking
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    location.pathname === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User section */}
          {user && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex flex-col space-y-4">
                <p className="text-base font-medium text-gray-900">
                  {user.name}
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
