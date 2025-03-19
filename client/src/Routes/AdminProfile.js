import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Admin Profile</h1>
      <Button onClick={handleSeeItineraries} style={{ margin: '10px' }}>See the Itineraries</Button>
      <Button onClick={handleSeeQueries} style={{ margin: '10px' }}>See the Queries</Button>
      <Button onClick={handleSeeFeedbacks} style={{ margin: '10px' }}>See the Feedbacks</Button>
      <Button onClick={handleSeeUsers} style={{ margin: '10px' }}>See the Users</Button>
      <Button onClick={handleLogout} style={{ margin: '10px' }}>Logout</Button>
    </div>
  );
};

export default AdminProfile;
