import React, { useState } from "react";
import { motion } from "framer-motion";

interface PaymentProps {
  totalAmount: number;
  selectedSeats: Array<{
    id: string;
    number: string;
  }>;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

export const Payment: React.FC<PaymentProps> = ({
  totalAmount,
  selectedSeats,
  onPaymentComplete,
  onCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "upi" | "netbanking"
  >("card");
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onPaymentComplete();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Complete Payment
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-indigo-700 font-medium">
                    Selected Seats
                  </p>
                  <p className="mt-1 text-xl font-bold text-indigo-900">
                    {selectedSeats.map((seat) => seat.number).join(", ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-indigo-700 font-medium">
                    Total Amount
                  </p>
                  <p className="mt-1 text-2xl font-bold text-indigo-900">
                    ₹{totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4">
              {(["card", "upi", "netbanking"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === method
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-200"
                  }`}
                >
                  <div className="text-center">
                    <div className="mb-2">
                      {method === "card" && (
                        <svg
                          className="w-6 h-6 mx-auto text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      )}
                      {method === "upi" && (
                        <svg
                          className="w-6 h-6 mx-auto text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {method === "netbanking" && (
                        <svg
                          className="w-6 h-6 mx-auto text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {method}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === "card" && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${totalAmount}`
                )}
              </button>
            </form>
          )}

          {paymentMethod === "upi" && (
            <div className="text-center p-8">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Scan QR Code to Pay
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Use any UPI app to scan and pay
              </p>
              <button
                onClick={handlePayment}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simulate UPI Payment
              </button>
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  "HDFC Bank",
                  "ICICI Bank",
                  "SBI",
                  "Axis Bank",
                  "Kotak Bank",
                  "Other Banks",
                ].map((bank) => (
                  <button
                    key={bank}
                    onClick={handlePayment}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <p className="text-sm font-medium text-gray-900">{bank}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
