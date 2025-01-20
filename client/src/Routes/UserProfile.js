import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../Components/UserNavbar';
import '../Styles/UserProfile.css';

const UserProfile = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="user-profile">
      <UserNavbar />
      <div className="profile-content">
        <h1>Welcome, {userData.name}</h1>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
        <p>Email: {userData.email}</p>
        <p>Member since: {userData.joinDate}</p>
      </div>
    </div>
  );
};

export default UserProfile;
