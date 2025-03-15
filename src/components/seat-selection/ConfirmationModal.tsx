import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedSeats: Array<{
    id: string;
    number: string;
    type: string;
  }>;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedSeats,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Confirm Booking
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You are about to book the following seats:
                  </p>
                  <div className="mt-4 space-y-2">
                    {selectedSeats.map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Seat {seat.number}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {seat.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
