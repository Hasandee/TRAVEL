import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useUserLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success("Login successful!");
        login(data.token, data.user);

        if (data.user.role === "admin") {
          navigate("/adminprofile");
        } else {
          navigate("/userprofile");
        }
      } else if (res.status === 404) {
        setError("User not found. Please check your credentials.");
      } else if (res.status === 400 || res.status === 401) {
        setError("Invalid email or password.");
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Function
  const forgotPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success("Password reset link sent to your email.");
      } else if (res.status === 404) {
        setError("Email not found. Please enter a valid email.");
      } else {
        setError("Failed to send reset link. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  return { loading, error, loginUser, forgotPassword };
};

export default useUserLogin;
