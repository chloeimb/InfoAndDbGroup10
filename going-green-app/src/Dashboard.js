import React, { useEffect, useState } from 'react';
import BottomNav from './BottomNav'; // Import the BottomNav component

function Dashboard({ userId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch(`http://localhost:3000/api/activities/${userId}`);
      const data = await response.json();
      setActivities(data);
    };
    fetchActivities();
  }, [userId]);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.ACTIVITY} - {activity.CARBON_IMPACT} kg CO2 - {new Date(activity.TIMESTAMP).toLocaleString()}
          </li>
        ))}
      </ul>
      <BottomNav /> {/* Include the bottom navigation bar */}
    </div>
  );
}

export default Dashboard;
