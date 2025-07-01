import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // ✅ your shared context

const ProfileDropdown = () => {
  const context = useContext(AuthContext); // ✅ use the context

  if (!context) return null; // ✅ handle null case

  const { user, logout } = context;

  return (
    <div className="profile-dropdown">
      <span>{user?.userName}</span>
      <div className="dropdown-content">
        <p>Role: {user?.role}</p>
        <p>Email: {user?.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
