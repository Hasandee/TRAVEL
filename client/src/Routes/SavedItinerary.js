import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"; 
import "../Styles/SavedItinerary.css"; // Import the CSS file

function SavedItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/itinerary");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setItineraries(data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div id="saved-itineraries-container">
      <h2 id="saved-itineraries-title">Saved Itineraries</h2>
      <button id="back-to-profile-btn" onClick={() => navigate("/profile")}>
        Back to Profile
      </button>
      {loading ? (
        <p id="loading-message">Loading...</p>
      ) : itineraries.length === 0 ? (
        <p id="no-itineraries-message">No saved itineraries yet.</p>
      ) : (
        <ul id="itinerary-list">
          {itineraries.map((itinerary, index) => (
            <li key={index} className="itinerary-card">
              <strong className="itinerary-label">Email:</strong> {itinerary.email || "N/A"} <br />
              <strong className="itinerary-label">Destination:</strong> {itinerary.Preferred_Locations} <br />
              <strong className="itinerary-label">Activities:</strong> {itinerary.Activities.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedItineraries;
