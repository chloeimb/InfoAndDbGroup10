import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNav.css'; // Import the CSS for styling

function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="/dashboard" className="nav-button">Dashboard</Link>
      <Link to="/log-activity" className="nav-button">Log Activity</Link>
      <Link to="/articles" className="nav-button">Articles</Link>
    </div>
  );
}

export default BottomNav;
