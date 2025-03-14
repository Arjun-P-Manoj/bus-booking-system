import { Link } from "react-router-dom";
import { commonStyles } from "../styles/common";

export function Navbar() {
  const styles = {
    navbar: {
      backgroundColor: commonStyles.colors.white,
      padding: `${commonStyles.spacing.md} ${commonStyles.spacing.xl}`,
      boxShadow: commonStyles.shadows.sm,
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: commonStyles.typography.h2.fontSize,
      fontWeight: "bold",
      color: commonStyles.colors.primary,
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: commonStyles.spacing.lg,
      alignItems: "center",
    },
    navLink: {
      ...commonStyles.typography.body,
      color: commonStyles.colors.text.primary,
      textDecoration: "none",
      fontWeight: 500,
      padding: `${commonStyles.spacing.sm} ${commonStyles.spacing.md}`,
      borderRadius: commonStyles.borderRadius.md,
      transition: "all 0.3s ease",
      ":hover": {
        color: commonStyles.colors.primary,
        backgroundColor: commonStyles.colors.background,
        transform: "translateY(-2px)",
      },
    },
    button: {
      backgroundColor: commonStyles.colors.primary,
      color: commonStyles.colors.white,
      padding: `${commonStyles.spacing.sm} ${commonStyles.spacing.lg}`,
      borderRadius: commonStyles.borderRadius.md,
      fontSize: commonStyles.typography.body.fontSize,
      fontWeight: 500,
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: commonStyles.colors.primaryHover,
        transform: "translateY(-2px)",
      },
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          BusBooking
        </Link>
        <div style={styles.navLinks}>
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary-50 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              Home
            </Link>
            <Link
              to="/buses"
              className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-primary-50 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              Available Buses
            </Link>
            <Link
              to="/login"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary-700 hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:-translate-y-0.5"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
