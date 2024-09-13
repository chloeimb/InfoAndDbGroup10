import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function LogActivity() {
  const [activity, setActivity] = useState('');
  const [carbonImpact, setCarbonImpact] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the activity and carbon impact
    console.log('Activity:', activity);
    console.log('Carbon Impact:', carbonImpact);

    // Set success message
    setMessage(`Activity "${activity}" with impact ${carbonImpact} has been logged.`);

    // Clear form fields
    setActivity('');
    setCarbonImpact('');
  };

  // Navigate back to the dashboard
  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div>
      <h1>Log Activity</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Activity:
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="E.g., Biking, Recycling"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Carbon Impact (kg CO2):
            <input
              type="number"
              value={carbonImpact}
              onChange={(e) => setCarbonImpact(e.target.value)}
              placeholder="E.g., -2.5"
              required
            />
          </label>
        </div>
        <button type="submit">Log Activity</button>
      </form>

      {/* Add a button to go back to the dashboard */}
      <button onClick={goToDashboard}>Back to Dashboard</button>
    </div>
  );
}

export default LogActivity;
