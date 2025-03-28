import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { message } from "antd";

const useUserSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError("Passwords are not the same");
      return;
    }

    try {
      setError(null); // Clear previous errors
      setLoading(true); // Start loading spinner
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 201) {
        message.success("User registered successfully"); // Success message
        login(data.token, data.user);
      } else if (res.status === 409) {
        setError("Email is already registered"); // Handle duplicate email error
      } else if (res.status === 400) {
        setError(data.message); // Handle other client-side errors
      } else {
        message.error("Registration Failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return { loading, error, registerUser };
};

export default useUserSignup;
