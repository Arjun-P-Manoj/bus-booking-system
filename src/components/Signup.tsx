import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    isPregnant: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.name.trim())) {
      newErrors.name = "Please enter a valid name (2-50 characters)";
      isValid = false;
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 1 || age > 120) {
        newErrors.age = "Please enter a valid age (1-120)";
        isValid = false;
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  const isElderly = parseInt(formData.age) >= 60;
  const showPregnancyOption = formData.gender === "female";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Nav />
      <div className="pt-28 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="mt-2 text-gray-600">
              Join us for a comfortable journey experience
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-500">{errors.age}</p>
              )}
              {isElderly && (
                <p className="mt-1 text-sm text-indigo-600">
                  ✨ Senior Citizen - Special discounts available
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white cursor-pointer pr-10"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Pregnancy Option for Females */}
            {showPregnancyOption && (
              <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id="isPregnant"
                  name="isPregnant"
                  checked={formData.isPregnant}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                />
                <label
                  htmlFor="isPregnant"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I am pregnant (eligible for priority seating)
                </label>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg text-white overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-500"></span>
              <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500 to-indigo-400"></span>
              <span className="relative">Create Account</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
