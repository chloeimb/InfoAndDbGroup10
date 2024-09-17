import React, { useEffect, useState } from 'react';
import ActivityChart from './ActivityChart'; // Import the chart component
import BottomNav from './BottomNav';

function Dashboard({ userId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user activities from the backend
    const fetchActivities = async () => {
      const response = await fetch(`http://localhost:3000/api/activities/${userId}`);
      const data = await response.json();
      setActivities(data); // Store the activities data
    };

    fetchActivities();
  }, [userId]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <ActivityChart data={activities} /> {/* Pass activities to the chart */}
      <BottomNav />
    </div>
  );
}

export default Dashboard;
