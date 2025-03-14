import { Link } from "react-router-dom";
import { commonStyles } from "../styles/common";

export function Home() {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      backgroundColor: commonStyles.colors.background,
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      padding: `${commonStyles.spacing.xl} ${commonStyles.spacing.md}`,
      marginTop: "64px", // Height of navbar
      gap: commonStyles.spacing.xl * 4,
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1200px",
      width: "100%",
      gap: commonStyles.spacing.xl * 2,
      marginBottom: commonStyles.spacing.xl * 2,
    },
    heroContent: {
      flex: 1,
      textAlign: "left" as const,
    },
    heroImage: {
      flex: 1,
      maxWidth: "600px",
      height: "400px",
      borderRadius: commonStyles.borderRadius.lg,
      overflow: "hidden",
      boxShadow: commonStyles.shadows.lg,
      backgroundImage:
        "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    title: {
      ...commonStyles.typography.h1,
      color: commonStyles.colors.text.primary,
      marginBottom: commonStyles.spacing.lg,
      fontSize: "56px",
      lineHeight: 1.2,
      fontWeight: 800,
    },
    subtitle: {
      ...commonStyles.typography.body,
      color: commonStyles.colors.text.secondary,
      marginBottom: commonStyles.spacing.xl,
      fontSize: "20px",
      maxWidth: "500px",
      lineHeight: 1.6,
    },
    buttonsContainer: {
      display: "flex",
      gap: commonStyles.spacing.md,
    },
    button: {
      padding: `${commonStyles.spacing.md} ${commonStyles.spacing.xl}`,
      borderRadius: commonStyles.borderRadius.md,
      fontSize: commonStyles.typography.body.fontSize,
      fontWeight: 600,
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.3s ease",
      minWidth: "160px",
      textAlign: "center" as const,
    },
    primaryButton: {
      backgroundColor: commonStyles.colors.primary,
      color: commonStyles.colors.white,
      border: "none",
      ":hover": {
        backgroundColor: commonStyles.colors.primaryHover,
        transform: "translateY(-2px)",
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      },
    },
    outlineButton: {
      backgroundColor: "transparent",
      color: commonStyles.colors.primary,
      border: `2px solid ${commonStyles.colors.primary}`,
      ":hover": {
        backgroundColor: commonStyles.colors.primary,
        color: commonStyles.colors.white,
        transform: "translateY(-2px)",
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      },
    },
    features: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: commonStyles.spacing.xl,
      width: "100%",
      maxWidth: "1200px",
    },
    feature: {
      padding: commonStyles.spacing.xl,
      backgroundColor: commonStyles.colors.white,
      borderRadius: commonStyles.borderRadius.lg,
      boxShadow: commonStyles.shadows.md,
      textAlign: "center" as const,
      transition: commonStyles.transitions.default,
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: commonStyles.shadows.lg,
      },
    },
    featureIcon: {
      width: "64px",
      height: "64px",
      margin: "0 auto",
      marginBottom: commonStyles.spacing.lg,
      color: commonStyles.colors.primary,
    },
    featureTitle: {
      ...commonStyles.typography.h2,
      color: commonStyles.colors.text.primary,
      marginBottom: commonStyles.spacing.md,
      fontSize: "24px",
    },
    featureText: {
      ...commonStyles.typography.body,
      color: commonStyles.colors.text.secondary,
      lineHeight: 1.6,
    },
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-8 py-8 sm:py-12 mt-12 space-y-8">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full gap-8 lg:gap-16 pb-2">
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            Book Your Bus Journey with Ease
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Find the best routes and prices for your journey. Experience
            comfortable and reliable bus travel across the country with our
            premium service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base font-semibold cursor-pointer min-w-[160px] text-center bg-primary-600 text-white border-none transition-all duration-300 ease-in-out hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(79,70,229,0.7)]"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base font-semibold cursor-pointer min-w-[160px] text-center bg-transparent text-primary-600 border-2 border-primary-600 transition-all duration-300 ease-in-out hover:bg-primary-600 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(79,70,229,0.7)]"
            >
              Login
            </Link>
          </div>
        </div>
        <div
          className="w-full lg:flex-1 max-w-[600px] h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')",
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl">
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Wide Network
          </h3>
          <p className="text-gray-600 text-center">
            Access to thousands of routes across the country with multiple
            operators to choose from. Find the perfect route for your journey.
          </p>
        </div>
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Best Prices
          </h3>
          <p className="text-gray-600 text-center">
            Compare prices from different operators and get the best deals for
            your journey. Save money with our competitive pricing.
          </p>
        </div>
        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
            Easy Booking
          </h3>
          <p className="text-gray-600 text-center">
            Simple and secure booking process with instant confirmation and
            e-tickets. Book your journey in just a few clicks.
          </p>
        </div>
      </div>
    </div>
  );
}
