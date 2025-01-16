import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Button } from 'antd';

const UserProfile = () => {
  const { UserData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
};
  return (
    <div>
      <Button onClick={logout}> Logout</Button>
      <h1>UserProfile</h1>
    </div>
  )
}

export default UserProfile
