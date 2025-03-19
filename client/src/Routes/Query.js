import React, { useState, useEffect } from "react";
import { submitQuery, fetchLoggedUserQueries } from "../api.js";
import "../Styles/Query.css"; // Import the CSS file
import Footer from '../Components/Footer';
import DefaultProfilePic from '../Assests/img2.jpg';
import { useAuth } from '../Contexts/AuthContext'; // Importing the useAuth context
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Query() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const [error, setError] = useState(""); // Error state for form validation

  const { logout } = useAuth(); // Accessing the logout function from context
  const navigate = useNavigate(); // Using navigate for routing

  // Assuming the user's email is stored in localStorage after login
  const loggedUser = localStorage.getItem("user_data");
  const parsedUser = JSON.parse(loggedUser);
  const loggedUserEmail = parsedUser?.user?.email;

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const data = await fetchLoggedUserQueries(loggedUserEmail);
    setQueries(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Query cannot be empty.");
      return;
    }
    if (query.length > 500) {
      setError("Query cannot exceed 500 characters.");
      return;
    }

    setError(""); // Clear error message if validation passes

    await submitQuery({ text: query, email: loggedUserEmail });
    setQuery("");
    loadQueries();
    
    // Show success alert after submission
    alert("Query Submitted Successfully");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Navigate to login page after logging out
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div>
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
            <img src={DefaultProfilePic} alt="Profile" className="profile-pic" />
            {showDropdown && ( // Conditionally render dropdown menu
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

      <div className="query-container">
        <h2 className="query-heading">Submit a Query</h2>
        <form onSubmit={handleSubmit} className="query-form">
          <textarea
            className="query-textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query..."
          />
          {error && <p className="error-message">{error}</p>} {/* Display error message if validation fails */}
          <button type="submit" className="query-button">
            Submit
          </button>
        </form>

        <h3 className="query-heading">Your Past Queries</h3>
        <div className="query-list">
          {queries.map((q) => (
            <div key={q._id} className="query-item">
              <strong>Your Query:</strong> {q.text}
              {q.response && (
                <p className="admin-reply">
                  <strong>Admin Reply:</strong> {q.response}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Query;
