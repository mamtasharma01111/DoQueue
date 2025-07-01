import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/assign-task">Assign Task</Link>
        <Link to="/history">History</Link>
        <Link to="/query">Query</Link>
      </nav>
      <ProfileDropdown />
    </header>
  );
};

export default Header;
