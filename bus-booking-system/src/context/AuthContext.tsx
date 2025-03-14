import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0], // Use email prefix as name for demo
        email,
        role: "user",
        userType: "Normal",
        isAdmin: false,
      };

      // Save user data
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Validate inputs
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // In a real app, this would be an API call
      // For demo, we'll simulate a successful signup
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "user",
        userType: "Normal",
        isAdmin: false,
      };

      // Save user data
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
