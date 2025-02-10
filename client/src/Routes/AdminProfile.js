import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Button } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const { UserData, logout } = useAuth();
const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
};
  return (
    <div>
      <Button onClick={logout}> Logout</Button>
      <h1>Admin Profile</h1>
    </div>
  )
}

export default AdminProfile