import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import { UserType } from "../../types";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  age?: number;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  userType: yup
    .string()
    .oneOf(["Normal", "Elderly", "Pregnant", "Female"])
    .required("User type is required"),
  age: yup
    .number()
    .min(1, "Age must be greater than 0")
    .max(120, "Age must be less than 120")
    .optional(),
});

export function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { request, loading, error } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await request({
        method: "POST",
        url: "/auth/signup",
        data,
      });
      login(response);
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by useApi hook
      console.error("Signup failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Name" {...register("name")} error={errors.name?.message} />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Type
        </label>
        <select
          {...register("userType")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select user type</option>
          <option value="Normal">Normal</option>
          <option value="Elderly">Elderly</option>
          <option value="Pregnant">Pregnant</option>
          <option value="Female">Female</option>
        </select>
        {errors.userType?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
        )}
      </div>
      <Input
        label="Age"
        type="number"
        {...register("age")}
        error={errors.age?.message}
      />
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
      <Button type="submit" isLoading={loading} className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
