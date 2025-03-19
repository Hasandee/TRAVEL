import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DefaultProfilePic from "../Assests/img2.jpg";
import Footer from "../Components/Footer";
import "../Styles/Feedback.css";

function Feedback() {
  const { UserData, logout } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // ✅ Email Validation Function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    // ✅ Input Validations
    if (!email.trim() || !message.trim()) {
      setError("All fields are required!");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      setError("Feedback message must be at least 10 characters long.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) throw new Error("Failed to submit feedback");

      const newFeedback = await res.json();
      setFeedbacks([newFeedback, ...feedbacks]);
      setMessage("");
      setEmail("");
      setSuccess("Feedback submitted successfully! 🎉");
    } catch (error) {
      setError("Error submitting feedback. Please try again later.");
    }
  };

  return (
    <div className="feedback-page">
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <h1 className="navbar-logo">ExploreLanka</h1>
          <li><a href="/userprofile">Home</a></li>
          <li><a href="/itinerarypage">Itinerary Planner</a></li>
          <li><a href="/destinations">Destinations</a></li>
          <li><a href="/query">Queries</a></li>
          <li><a href="/feedback">Feedback</a></li>
          <li className="profile-icon" onClick={toggleDropdown}>
            <img src={profilePicture || DefaultProfilePic} alt="Profile" className="profile-pic" />
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="/profile">Profile</a>
                <a href="/saveditinerary">Trips</a>
                <a href="/write-review">Write a Review</a>
                <a href="/messages">Messages</a>
                <button onClick={handleLogout} className="logout-button">Sign Out</button>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h2 className="feedback-title">What Our Clients Say</h2>
        <p className="feedback-subtitle">See what our users are saying about our service</p>
        <div className="feedback-container">
          {feedbacks.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            feedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-card">
                <div className="feedback-user">
                  {/* <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" /> */}
                  <div>
                    <p className="user-email">{feedback.email}</p>
                    <p className="feedback-text">"{feedback.message}"</p>
                  </div>
                </div>
                <p className="feedback-date">{new Date(feedback.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="feedback-form-container">
        <h2>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          {/* ✅ Display Error or Success Messages */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <textarea
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="textarea-field"
          />
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Feedback;
