import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeImg from '../Assests/test6.jpg';
import Hero from '../Components/Hero';
import '../Styles/UserProfile.css';
import DefaultProfilePic from '../Assests/img2.jpg';
import Destination from '../Components/Destination';
import Trip from '../Components/Trip';
import Footer from '../Components/Footer';

const UserProfile = () => {
  const { UserData, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

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
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <div className="user-profile">
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

      <Hero 
        cName="hero"
        heroImg={HomeImg}
        title="Explore the Beauty of Sri Lanka"
        text="Discover breathtaking landscapes, vibrant culture, and unforgettable adventures."
        buttonText="Travel Plan"
        url="/login"
        btnClass="show"
      />
        <Destination/>
      <Trip/>
      <Footer/>
    </div>
  );
}

export default UserProfile;