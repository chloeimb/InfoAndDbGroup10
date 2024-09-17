import React from 'react';
import BottomNav from './BottomNav'; // Import the BottomNav component

function Dashboard({ userId }) {
  // Render the dashboard content here
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <BottomNav /> {/* Include the bottom navigation bar */}
    </div>
  );
}

export default Dashboard;
