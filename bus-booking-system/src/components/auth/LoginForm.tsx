import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { request, loading, error } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await request({
        method: "POST",
        url: "/auth/login",
        data,
      });
      login(response);
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by useApi hook
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
      <Button type="submit" isLoading={loading} className="w-full">
        Log In
      </Button>
    </form>
  );
}
