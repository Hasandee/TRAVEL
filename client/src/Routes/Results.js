import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Results.css"; // Import the CSS file
import Footer from '../Components/Footer';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendation = location.state?.recommendation;
  const [saved, setSaved] = useState(false);

  if (!recommendation) {
    return (
      <div className="page-background">
        <div className="no-results">
          <h2>No recommendations found.</h2>
          <button onClick={() => navigate("/travelform")} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Function to save itinerary to the database
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/itinerary/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recommendation),
      });

      if (response.ok) {
        setSaved(true);
        alert("Itinerary saved successfully!");
      } else {
        alert("Failed to save itinerary.");
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);
    }
  };

  return (
    <div className="page-background">
      <div className="results-container">
        <div className="card">
          <h2 className="title">🌍 Recommended Itinerary</h2>
          <div className="destination">
            <strong>🏙 Destination:</strong> {recommendation.Preferred_Locations}
          </div>
          <div className="activities">
            <strong>🎯 Activities:</strong>
            <ul>
              {recommendation.Activities.split(", ").map((activity, index) => (
                <li key={index}>✔ {activity}</li>
              ))}
            </ul>
          </div>

          {/* Save Itinerary Button */}
          <button onClick={handleSave} disabled={saved} className="save-button">
            {saved ? "✔ Saved" : "💾 Save Itinerary"}
          </button>

          <button onClick={() => navigate("/userprofile")} className="home-button">
            🏠 Go to Home
          </button>
        </div>
      </div>
      <div className="travelfooter">
        <Footer />
      </div>
    </div>
  );
};

export default Results;
