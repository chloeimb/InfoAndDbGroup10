import React, { useState } from 'react';
import { Container, Typography, MenuItem, TextField, Button } from '@mui/material';
import BottomNav from './BottomNav'; // Import the ribbon
import './BottomNav.css'; // Import the custom CSS for styling
import backgroundImage from './images/logactivityimage.png'; // Adjust this path

const LogActivity = () => {
  const [activityType, setActivityType] = useState('');
  const [gallons, setGallons] = useState('');
  const [hours, setHours] = useState('');
  const [activities, setActivities] = useState([]);

  const handleActivityChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleGallonsChange = (event) => {
    setGallons(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const logActivity = async () => {
    const co2Emission = calculateCO2Emission(activityType, gallons, hours);
  
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
          hours,
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
            hours,
            co2Emission,
          },
        ]);
  
        // Clear the fields after logging
        setActivityType('');
        setGallons('');
        setHours('');
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
          <MenuItem value="driving">Driving (Gas Car)</MenuItem>
          <MenuItem value="biking">Biking</MenuItem>
          <MenuItem value="electricity">Electricity Used</MenuItem>
          <MenuItem value="phone">Phone Usage</MenuItem>
          <MenuItem value="airplane">Airplane Flights</MenuItem>
          <MenuItem value="water">Water Usage (Hot Showers)</MenuItem>
          <MenuItem value="train">Train</MenuItem>
          <MenuItem value="heating-unit">Heating (Inside Home)</MenuItem>
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

        {activityType === 'biking' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'electricity' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'phone' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'airplane' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'water' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'train' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            fullWidth
            margin="normal"
          />
        )}

        {activityType === 'heating' && (
          <TextField
            label="Hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
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
const calculateCO2Emission = (activityType, gallons, hours) => {
  let co2Emission = 0;

  //https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references

  // 8,887 grams of CO2/gallon of gasoline = 8.887 × 10-3 metric tons CO2/gallon of gasoline
  if (activityType === 'driving') {
    co2Emission = 8887 * gallons; 
    //852.3 lbs CO2/MWh × 1 metric ton/2,204.6 lbs × 1/(1-0.073) MWh delivered/MWh generated × 1 MWh/1,000 kWh = 4.17 × 10-4 metric tons CO2/kWh
  } else if (activityType === 'biking') {
    co2Emission = (0) * hours;
    // Need to check this one again 
  } else if (activityType === 'electricity') {
    co2Emission = (0.000417 * hours) * 453.592; // times 453.592 to do lb to gram conversion
  } else if (activityType === 'phone') {
    co2Emission = (172) * hours;
    // 172 g CO2/hr
  } else if (activityType === 'airplane') {
    co2Emission = (32000) * hours;
    // 40 kg CO2/1h 15min --> 32 kg CO2/hr
  } else if (activityType === 'water') {
    co2Emission = (12000) * hours;
    // 2,000 g CO2/10 min --> 12,000 g CO2/hr
  } else if (activityType === 'train') {
    co2Emission = (7556) * hours;
    // 17 kg CO2/2 hr 15 min --> 7.556 kg CO2/hr
  } else if (activityType === 'heating') {
    co2Emission = (7000) * hours;
    // 7,000 g CO2/hr (one house)
  }

  return co2Emission.toFixed(2); // Return result with 2 decimal places
};

export default LogActivity;