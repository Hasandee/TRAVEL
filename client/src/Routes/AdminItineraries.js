import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Saved Itineraries</h2>
      <button onClick={() => navigate("/profile")} style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}>
        Back to Profile
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : itineraries.length === 0 ? (
        <p>No saved itineraries yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {itineraries.map((itinerary, index) => (
            <li key={index} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <strong>Destination:</strong> {itinerary.Preferred_Locations} <br />
              <strong>Activities:</strong> {itinerary.Activities.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedItineraries;
