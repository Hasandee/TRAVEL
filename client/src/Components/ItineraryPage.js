import React, { useState } from 'react';
import "../Styles/ItineraryPage.css"; // Import the CSS file
import ItineraryImg from "../Assests/img28.jpg"; // Change to your actual image path
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePic from '../Assests/img2.jpg';
import { Link } from "react-router-dom";
import Footer from '../Components/Footer';

const CampSection = () => {
    const { UserData, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

    const handleLogout = async () => {
        await logout();
        navigate("/login");
      };
      const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
      };
    
  return (
    <div className='itinerary'>
    <div className="camp-container">
         <nav className="navbar">
                <ul>
                  <h1 className="navbar-logo">ExploreLanka</h1>
                  <li><a href="/userprofile">Home</a></li>
                  <li><a href="/itinerarypage">Itinerary Planner</a></li>
                  <li><a href="/destinations">Destinations</a></li>
                  <li><a href="/queries">Queries</a></li>
                  <li><a href="/feedback">Feedback</a></li>
                  <li className="profile-icon" onClick={toggleDropdown}>
                  <img src={profilePicture || DefaultProfilePic} alt="Profile" className="profile-pic" />
                    {showDropdown && ( // Conditionally render dropdown menu
                      <div className="dropdown-menu">
                        <a href="/profile">Profile</a>
                        <a href="/trips">Trips</a>
                        <a href="/write-review">Write a Review</a>
                        <a href="/messages">Messages</a>
                        <button onClick={handleLogout} className="logout-button">Sign Out</button>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
    <div className="camp-box">
      <div className="camp-content">
        <h2 className="camp-title">Travel Itinerary</h2>
        <p className="camp-description">
        The ExploreLanka is an intelligent and user-centric platform designed to revolutionize travel planning by providing personalized recommendations. This system leverages advanced algorithms to analyze user preferences, including interests, budget range, travel type, duration, accommodation choices, and transportation preferences. Based on this data, it generates customized travel itineraries featuring ideal destinations, must-visit attractions, engaging activities, and suitable accommodations.
        With an intuitive interface, users can effortlessly input their travel details and receive well-structured recommendations that align with their preferences. The system ensures a seamless experience by integrating real-time travel insights, making trip planning more efficient and hassle-free. Whether for solo travelers, families, or adventure seekers, this recommender system helps users discover new places, optimize their schedules, and enhance their overall travel experience. By combining machine learning with a modern, interactive design, it transforms traditional itinerary planning into a smart, data-driven process that caters to individual needs.
        </p>
        
        <Link to="/travelform">
        <button className='camp-button'>Plan Your Vacation</button>
        </Link>
       
      </div>
      <div className="camp-image">
        <img src={ItineraryImg} alt="Family Camp" />
      </div>
    </div>
    </div>
    <Footer />
  </div>
  );
};

export default CampSection;
