import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useApi } from "../hooks/useApi";
import { Notification } from "../components/ui/Notification";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentState {
  busId: string;
  selectedSeats: number[];
  totalAmount: number;
}

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const [paymentState, setPaymentState] = useState<PaymentState | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    const state = location.state as PaymentState;
    if (!state) {
      navigate("/search");
      return;
    }
    setPaymentState(state);

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location.state, navigate]);

  const handlePayment = async () => {
    if (!paymentState) return;

    try {
      // In a real app, this would be an API call to create an order
      // const response = await request<{ orderId: string }>({
      //   url: "/orders",
      //   method: "POST",
      //   body: JSON.stringify({
      //     busId: paymentState.busId,
      //     seats: paymentState.selectedSeats,
      //     amount: paymentState.totalAmount,
      //   }),
      // });

      // Mock order ID
      const orderId = "order_" + Math.random().toString(36).substr(2, 9);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: paymentState.totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Bus Booking System",
        description: `Booking for ${paymentState.selectedSeats.length} seats`,
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // In a real app, this would verify the payment with your backend
            // await request({
            //   url: "/payments/verify",
            //   method: "POST",
            //   body: JSON.stringify({
            //     orderId,
            //     paymentId: response.razorpay_payment_id,
            //     signature: response.razorpay_signature,
            //   }),
            // });

            setNotification({
              show: true,
              type: "success",
              message: "Payment successful! Redirecting to bookings...",
            });

            setTimeout(() => {
              navigate("/bookings");
            }, 2000);
          } catch (error) {
            setNotification({
              show: true,
              type: "error",
              message: "Payment verification failed. Please contact support.",
            });
          }
        },
        prefill: {
          name: "John Doe", // Get from user context in real app
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setNotification({
        show: true,
        type: "error",
        message: "Failed to initiate payment. Please try again.",
      });
    }
  };

  if (!paymentState) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Order Summary */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900">Order Summary</h1>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selected Seats</span>
                <span className="text-gray-900 font-medium">
                  {paymentState.selectedSeats.sort((a, b) => a - b).join(", ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Number of Seats</span>
                <span className="text-gray-900 font-medium">
                  {paymentState.selectedSeats.length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-medium text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{paymentState.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payment Method
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <img
                    src="/razorpay-logo.png"
                    alt="Razorpay"
                    className="h-8 w-auto"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    Pay securely with Razorpay
                  </span>
                </div>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">
                Secure Payment
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Your payment information is encrypted and secure. We use
                Razorpay's secure payment gateway to process your transaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Notification
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
      />
    </Layout>
  );
}
