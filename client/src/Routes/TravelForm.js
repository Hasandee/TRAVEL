import React, { useState } from "react";
import axios from "axios";
import "../Styles/TravelForm.css"; // Import the CSS file
import Footer from '../Components/Footer';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePic from '../Assests/img2.jpg';
import FormImage1 from '../Assests/img29.avif'; 
import FormImage2 from '../Assests/img30.jpg';
import FormImage3 from '../Assests/img31.jpg'; 
import FormImage4 from '../Assests/img32.jpg';
import FormImage5 from '../Assests/img33.avif';
import FormImage6 from '../Assests/img34.jpg';
import FormImage7 from '../Assests/img35.jpg';
import FormImage8 from '../Assests/img36.jpg';

const TravelForm = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
    budget_range: "",
    travel_type: "",
    duration: "",
    accommodation_preference: "",
    transport_preferences: "",
    country_category: "",
  });

  const [step, setStep] = useState(0); // Track current question index
  const [recommendation, setRecommendation] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Array of images corresponding to each step
  const stepImages = [FormImage1, FormImage2, FormImage3, FormImage4, FormImage5, FormImage6, FormImage7, FormImage8];

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Ensure maximum of 2 interests can be selected
      if (name === "interests" && formData.interests.length >= 2 && checked) {
        window.alert("You can select a maximum of 2 interests.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    // Validate current step before proceeding
    const currentQuestion = questions[step];

    if (currentQuestion.fields) {
      // Check if all fields in the current step are filled
      const isStepValid = currentQuestion.fields.every(
        (field) => formData[field.name].trim() !== ""
      );

      if (!isStepValid) {
        window.alert("Please fill out all fields before proceeding.");
        return;
      }
    } else if (currentQuestion.type === "checkbox" || currentQuestion.type === "radio") {
      // Check if at least one option is selected for checkbox/radio questions
      if (formData[currentQuestion.name].length === 0) {
        window.alert("Please select at least one option before proceeding.");
        return;
      }
    }

    // Proceed to the next step if validation passes
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the entire form before submission
    const isFormValid = questions.every((question) => {
      if (question.fields) {
        return question.fields.every((field) => formData[field.name].trim() !== "");
      } else if (question.type === "checkbox" || question.type === "radio") {
        return formData[question.name].length > 0;
      }
      return true;
    });

    if (!isFormValid) {
      window.alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const formDataToSend = {
        ...formData,
        interests: Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests,
      };

      const response = await axios.post(
        "http://127.0.0.1:8080/api/ml/predict",
        formDataToSend,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data && response.data.data) {
        setRecommendation(response.data.data);
        navigate("/results", { state: { recommendation: response.data.data } });
      } else {
        window.alert("Unexpected API response format.");
      }
    } catch (err) {
      console.error("API Error:", err);
      window.alert(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  const questions = [
    {
      label: "Personal Information",
      fields: [
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
      ],
    },
    {
      label: "Interests",
      name: "interests",
      type: "checkbox",
      options: ["Culture", "Adventure", "Beach", "Wildlife"],
    },
    {
      label: "Budget Range",
      name: "budget_range",
      type: "radio",
      options: ["Low", "Medium", "High"],
    },
    {
      label: "Travel Type",
      name: "travel_type",
      type: "radio",
      options: ["Solo", "Family", "Group"],
    },
    {
      label: "Duration",
      name: "duration",
      type: "radio",
      options: ["One Week", "Two Weeks", "Three Weeks", "More than Three Weeks"],
    },
    {
      label: "Accommodation Preference",
      name: "accommodation_preference",
      type: "radio",
      options: ["Budget", "Luxury", "Eco-friendly"],
    },
    {
      label: "Transport Preferences",
      name: "transport_preferences",
      type: "radio",
      options: ["Train", "Bus", "Rental Car"],
    },
    {
      label: "Country Category",
      name: "country_category",
      type: "radio",
      options: ["Sri Lanka", "Foreign Country"],
    },
  ];

  return (
    <div className="travelform">
      <nav className="navbar">
        <ul>
          <h1 className="navbar-logo">ExploreLanka</h1>
          <li><a href="/">Home</a></li>
          <li><a href="/travelform">Itinerary Planner</a></li>
          <li><a href="/destinations">Destinations</a></li>
          <li><a href="/queries">Queries</a></li>
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

      <div className="form-container">
        <div className="form-image">
          <img src={stepImages[step]} alt={`Step ${step + 1}`} />
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="question-container" style={{ transform: `translateX(-${step * 100}%)` }}>
            {questions.map((q, index) => (
              <div className="question" key={index}>
                <label className="label">{q.label}:</label>
                {q.fields ? (
                  q.fields.map((field) => (
                    <div key={field.name}>
                      <label className="label">{field.label}:</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                  ))
                ) : q.type === "checkbox" || q.type === "radio" ? (
                  <div className="options">
                    {q.options.map((option) => (
                      <label key={option} className="option-label">
                        <input
                          type={q.type}
                          name={q.name}
                          value={option}
                          onChange={handleChange}
                          className="option-input"
                          checked={
                            q.type === "checkbox"
                              ? formData[q.name].includes(option)
                              : formData[q.name] === option
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : null}
                <div className="button-container">
                  {step > 0 && (
                    <button type="button" className="nextback-button" onClick={handleBack}>
                      Back
                    </button>
                  )}
                  {index < questions.length - 1 ? (
                    <button type="button" className="next-button" onClick={handleNext}>
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
        
      </div>

      {recommendation && (
        <div className="recommendation">
          <h3>Recommended Itinerary:</h3>
          {recommendation.Preferred_Locations ? (
            <p><strong>Destination:</strong> {recommendation.Preferred_Locations}</p>
          ) : (
            <p className="error-text">Destination data missing</p>
          )}

          {recommendation.Activities ? (
            <p><strong>Activities:</strong> {recommendation.Activities}</p>
          ) : (
            <p className="error-text">Activity data missing</p>
          )}
        </div>
      )}
      <div className="formfooter">
       <Footer />
       </div>
    </div>
  );
};

export default TravelForm;