import React, { useState } from 'react';
import { Container, Typography, MenuItem, TextField, Button } from '@mui/material';
import BottomNav from './BottomNav'; // Import the ribbon
import './BottomNav.css'; // Import the custom CSS for styling

const LogActivity = () => {
  const [activityType, setActivityType] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [activities, setActivities] = useState([]);

  const handleActivityChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const logActivity = () => {
    const co2Emission = calculateCO2Emission(activityType, distance, time);

    // Add the new activity to the list
    setActivities([
      ...activities,
      {
        activityType,
        distance,
        time,
        co2Emission,
      },
    ]);

    // Clear the fields after logging
    setActivityType('');
    setDistance('');
    setTime('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Log Activity
      </Typography>
      
      <TextField
        select
        label="Activity Type"
        value={activityType}
        onChange={handleActivityChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="driving">Driving</MenuItem>
        <MenuItem value="walking">Walking</MenuItem>
        <MenuItem value="biking">Biking</MenuItem>
        {/* Add more activities as needed */}
      </TextField>
      
      {activityType === 'driving' && (
        <TextField
          label="Distance (miles)"
          type="number"
          value={distance}
          onChange={handleDistanceChange}
          fullWidth
          margin="normal"
        />
      )}

      {activityType === 'walking' && (
        <TextField
          label="Time (minutes)"
          type="number"
          value={time}
          onChange={handleTimeChange}
          fullWidth
          margin="normal"
        />
      )}

      {activityType === 'biking' && (
        <TextField
          label="Distance (miles)"
          type="number"
          value={distance}
          onChange={handleDistanceChange}
          fullWidth
          margin="normal"
        />
      )}
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={logActivity}
        fullWidth
        sx={{ mt: 2 }}
      >
        Log Activity
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Logged Activities
      </Typography>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.activityType} - CO2 Emission: {activity.co2Emission} kg
          </li>
        ))}
      </ul>

      {/* Ribbon at the bottom */}
      <BottomNav />
    </Container>
  );
};

// CO2 emission calculation logic
const calculateCO2Emission = (activityType, distance, time) => {
  let co2Emission = 0;

  if (activityType === 'driving') {
    co2Emission = distance * 0.404; // 0.404 kg CO2 per mile driven
  } else if (activityType === 'walking') {
    co2Emission = (time / 30) * 0.06; // 0.06 kg CO2 per 30 minutes walking
  } else if (activityType === 'biking') {
    co2Emission = distance * 0.05; // 0.05 kg CO2 per mile biking
  }

  return co2Emission.toFixed(2); // Return result with 2 decimal places
};

export default LogActivity;
