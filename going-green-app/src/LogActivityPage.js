import React, { useState } from 'react';
import BottomNav from './BottomNav'; // Import the BottomNav component

function LogActivity({ userId }) {
  const [activity, setActivity] = useState('');
  const [carbonImpact, setCarbonImpact] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/log-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, activity, carbonImpact }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(`Activity "${activity}" with impact ${carbonImpact} logged.`);
      setActivity('');
      setCarbonImpact('');
    } else {
      alert('Error: ' + data.message);
    }
  };

  return (
    <div>
      <h1>Log Activity</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Activity:
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </label>
        <label>Carbon Impact (kg CO2):
          <input
            type="number"
            value={carbonImpact}
            onChange={(e) => setCarbonImpact(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log Activity</button>
      </form>
      <BottomNav /> {/* Include the bottom navigation bar */}
    </div>
  );
}

export default LogActivity;
