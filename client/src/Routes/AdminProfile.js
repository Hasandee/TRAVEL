import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../Styles/AdminProfile.css'; // Import the custom CSS file

const AdminProfile = () => {
  const { UserData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSeeItineraries = () => {
    navigate('/adminitineraries');
  };

  const handleSeeQueries = () => {
    navigate('/adminquery');
  };

  const handleSeeFeedbacks = () => {
    navigate('/adminfeedback');
  };

  const handleSeeUsers = () => {
    navigate('/usermanagement');
  };

  return (
    <div className="admin-profile-container">
      <h1 className="admin-profile-title">Welcome, Admin</h1>
      <div className="button-container">
        <Button onClick={handleSeeItineraries} className="admin-profile-button">Itineraries</Button>
        <Button onClick={handleSeeQueries} className="admin-profile-button">Queries</Button>
        <Button onClick={handleSeeFeedbacks} className="admin-profile-button">Feedbacks</Button>
        <Button onClick={handleSeeUsers} className="admin-profile-button">Users</Button>
        <Button onClick={handleLogout} className="logout-button">Logout</Button>
      </div>
    </div>
  );
};

export default AdminProfile;
