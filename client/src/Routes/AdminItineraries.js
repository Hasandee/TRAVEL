import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/AdminItineraries.css';  // Importing the custom CSS

function SavedItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/itinerary/all");
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
    <div className="saved-itineraries-container">
      <h2 className="page-title">Saved Itineraries</h2>
      <button onClick={() => navigate("/adminprofile")} className="back-button">
        Back to Profile
      </button>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : itineraries.length === 0 ? (
        <p className="no-itinerary-message">No saved itineraries yet.</p>
      ) : (
        <div className="itinerary-card-container">
          {itineraries.map((itinerary, index) => (
            <div key={index} className="itinerary-card">
              <div className="itinerary-card-header">
                <h4>Destination: {itinerary.Preferred_Locations}</h4>
              </div>
              <div className="itinerary-card-body">
                <strong>Activities:</strong> {itinerary.Activities.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedItineraries;
