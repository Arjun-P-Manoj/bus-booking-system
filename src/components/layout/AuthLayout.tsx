import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MobileMenu } from "./MobileMenu";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Available Buses", href: "/buses" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
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
                  className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300"
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
                    className={`text-[15px] font-medium transition-all duration-200 relative group ${
                      isActive(item.href)
                        ? "text-indigo-600"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : ""
                      }`}
                    ></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu */}
            <div className="hidden md:ml-6 md:flex md:items-center">
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
            <div className="flex items-center md:hidden">
              <MobileMenu navigation={navigation} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
