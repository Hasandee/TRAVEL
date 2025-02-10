// Results.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Results.css"; // Import the CSS file
import Footer from '../Components/Footer';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendation = location.state?.recommendation;

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
