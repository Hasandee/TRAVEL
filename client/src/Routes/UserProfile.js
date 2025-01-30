import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/UserProfile.css';

const UserProfile = () => {
  const { UserData, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

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

  return (
    <div className="user-profile">
      <nav className="navbar">
        <ul>
        <h1 className="navbar-logo">ExploreLanka</h1>
          <li><a href="/home">Home</a></li>
          <li><a href="/itineraryplanner">Itinerary Planner</a></li>
          <li><a href="/destinations">Destinations</a></li>
          <li><a href="/queries">Queries</a></li>
          <li><a href="/feedback">Feedback</a></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
      {/* <div className="profile-container">
        <h1>Welcome, {UserData?.name || 'User'}!</h1>
        <div className="avatar-container">
          <img
            src={profilePicture || 'default-avatar.png'}
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <input type="file" id="file-upload" onChange={handleUpload} className="upload-input" />
        <label htmlFor="file-upload" className="upload-button">Upload Profile Picture</label>
      </div> */}
    </div>
  );
}

export default UserProfile;
