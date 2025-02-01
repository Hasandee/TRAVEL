import React, { useState } from "react";
import axios from "axios";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
    budget_range: "",
    travel_type: "",
    duration: "",
    transport_preferences: [],
    country_category: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value] // Add selected value
          : prev[name].filter((item) => item !== value), // Remove unselected value
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRecommendation(null);

    try {
      // Prepare data before sending
      const formDataToSend = {
        ...formData,
        interests: Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests,  // Ensure it's a string
        transport_preferences: Array.isArray(formData.transport_preferences) ? formData.transport_preferences.join(', ') : formData.transport_pref
      };

     console.log(formDataToSend);
     

      const response = await axios.post(
        "http://127.0.0.1:8080/api/ml/predict",  // Correct endpoint
        formDataToSend,  {
            headers: {
              'Content-Type': 'application/json', 
            }
          }
      );
      
      

      
      setRecommendation(response.data.data);
     
    } catch (err) {
        
        
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "50px auto" }}>
      <h2>Tourist Information Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        {/* Travel Preferences */}
        <div style={{ marginBottom: "10px" }}>
          <label>Interests:</label>
          <div>
            {["Culture", "Adventure", "Beach", "Wildlife", "Relaxation", "Culinary"].map((interests) => (
              <label key={interests} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  name="interests"
                  value={interests}
                  onChange={handleChange}
                />{" "}
                {interests}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Budget Range:</label>
          <div>
            {["Low", "Medium", "High"].map((budget_range) => (
              <label key={budget_range} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="budget_range"
                  value={budget_range}
                  onChange={handleChange}
                />{" "}
                {budget_range}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Travel Type:</label>
          <div>
            {["Solo", "Family", "Group"].map((travel_type) => (
              <label key={travel_type} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="travel_type"
                  value={travel_type}
                  onChange={handleChange}
                />{" "}
                {travel_type}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Duration:</label>
          <div>
            {["One Week", "Two Weeks", "Three Weeks", "More than Three Weeks"].map((duration) => (
              <label key={duration} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="duration"
                  value={duration}
                  onChange={handleChange}
                />{" "}
                {duration}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Accommodation Preference:</label>
          <div>
            {["Budget", "Luxury", "Eco-friendly"].map((accommodation_preference) => (
              <label key={accommodation_preference} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="accommodation_preference"
                  value={accommodation_preference}
                  onChange={handleChange}
                />{" "}
                {accommodation_preference}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Transport Preferences:</label>
          <div>
            {["Train", "Bus", "Rental Car"].map((transport_preferences) => (
              <label key={transport_preferences} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  name="transport_preferences"
                  value={transport_preferences}
                  onChange={handleChange}
                />{" "}
                {transport_preferences}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Country Category:</label>
          <div>
            {["Sri Lanka", "Foreign Country"].map((country_category) => (
              <label key={country_category} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="country_category"
                  value={country_category}
                  onChange={handleChange}
                />{" "}
                {country_category}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            border: "none",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Get Itinerary
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
          Error: {error}
        </div>
      )}

      {recommendation && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Itinerary:</h3>
          <p>
            <strong>Destination:</strong> {recommendation.Preferred_Locations}
          </p>
          <p>
            <strong>Activities:</strong> {recommendation.Activities}
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelForm;
