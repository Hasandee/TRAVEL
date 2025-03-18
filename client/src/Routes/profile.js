import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>User Profile</h2>
      <div>
        <label htmlFor="profile-pic-upload">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%", cursor: "pointer" }}
          />
        </label>
        <input
          id="profile-pic-upload"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>
      <button
        onClick={() => navigate("/saveditinerary")}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Saved Itinerary
      </button>
    </div>
  );
}

export default Profile;
