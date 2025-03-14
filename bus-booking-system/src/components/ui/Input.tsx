import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200",
            {
              "border-gray-300 focus:ring-primary-500 focus:border-primary-500":
                !error,
              "border-red-300 focus:ring-red-500 focus:border-red-500": error,
            },
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={clsx("mt-1 text-sm", {
              "text-red-600": error,
              "text-gray-500": !error && helperText,
            })}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
