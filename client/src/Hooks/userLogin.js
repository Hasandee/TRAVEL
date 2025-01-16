import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { message } from "antd";

const useUserLogin = () => { // Renamed to start with "use" and PascalCase
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null); // Clear previous errors
      setLoading(true); // Start loading spinner
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success("Login successful!"); // Success message
        login(data.token, data.user); // Save user data and token
      } else if (res.status === 404) {
        setError("User not found. Please check your credentials.");
      } else if (res.status === 400) {
        setError("Invalid email or password.");
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return { loading, error, loginUser }; // Return state and loginUser function
};

export default useUserLogin;
