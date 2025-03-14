import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#F3F4F6",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      padding: "32px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "24px",
      textAlign: "center" as const,
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #D1D5DB",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      backgroundColor: "#4F46E5",
      color: "white",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginBottom: "16px",
    },
    link: {
      color: "#4F46E5",
      textDecoration: "none",
      fontSize: "14px",
      textAlign: "center" as const,
      display: "block",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to home on submit
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Login</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <Link to="/signup" style={styles.link}>
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
}
