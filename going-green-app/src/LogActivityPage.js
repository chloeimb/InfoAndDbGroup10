import React, { useState } from 'react';
import { Container, Typography, MenuItem, TextField, Button } from '@mui/material';
import BottomNav from './BottomNav'; // Import the ribbon
import './BottomNav.css'; // Import the custom CSS for styling
import backgroundImage from './images/logactivityimage.png'; // Adjust this path

const LogActivity = () => {
  const [activityType, setActivityType] = useState('');
  const [gallons, setGallons] = useState('');
  const [time, setTime] = useState('');
  const [activities, setActivities] = useState([]);

  const handleActivityChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const logActivity = async () => {
    const co2Emission = calculateCO2Emission(activityType, gallons, time);
  
    // Assuming you have a userId from your authentication context or stored globally
    const userId = 1; // Replace this with the actual user ID from your authentication
  
    try {
      const response = await fetch('http://localhost:3000/log-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          activityType,
          gallons,
          time,
          co2Emission,
        }),
      });
  
      if (response.ok) {
        // Successfully logged in the database
        setActivities([
          ...activities,
          {
            activityType,
            gallons,
            time,
            co2Emission,
          },
        ]);
  
        // Clear the fields after logging
        setActivityType('');
        setGallons('');
        setTime('');
      } else {
        const errorData = await response.json();
        console.error('Error logging activity:', errorData.message);
      }
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Full screen height
        width: '100vw', // Full screen width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures space is between form and BottomNav
        alignItems: 'center', // Center content horizontally
      }}
    >
      <Container sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 2, boxShadow: 3, mt: 4 }}>
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
          <MenuItem value="driving">Driving Gas Car</MenuItem>
          <MenuItem value="walking">Walking</MenuItem>
          <MenuItem value="biking">Biking</MenuItem>
        </TextField>

        {activityType === 'driving' && (
          <TextField
            label="Gallons"
            type="number"
            value={gallons}
            onChange={handleGallonsChange}
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
              {activity.activityType} - CO2 Emission: {activity.co2Emission} g
            </li>
          ))}
        </ul>
      </Container>

      {/* Bottom Navigation */}
      <div 
        style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center', // Center the BottomNav horizontally
        }}
      >
        <BottomNav />
      </div>
    </div>
  );
};

// CO2 emission calculation logic
const calculateCO2Emission = (activityType, distance, time) => {
  let co2Emission = 0;

  //https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references

  // 8,887 grams of CO2/gallon of gasoline = 8.887 × 10-3 metric tons CO2/gallon of gasoline
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
