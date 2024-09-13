import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You have successfully logged in.</p>
      <Link to="/log-activity">Log a New Activity</Link> {/* Link to Log Activity page */}
    </div>
  );
}

export default Dashboard;
