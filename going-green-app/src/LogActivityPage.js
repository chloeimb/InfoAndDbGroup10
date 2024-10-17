import React, { useState } from 'react';
import { Container, Typography, MenuItem, TextField, Button, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HouseIcon from '@mui/icons-material/House';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import BottomNav from './BottomNav'; // Import the ribbon
import './BottomNav.css'; // Import the custom CSS for styling
import backgroundImage from './images/logactivityimage.png'; // Adjust this path

const LogActivity = () => {
  const [activityType, setActivityType] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [loads, setLoads] = useState('');
  // default set timeofday to morning
  const [timeofDay, setTimeofDay] = useState('morning');
  // group the activities under morning, afternoon, and evening
  const [activities, setActivities] = useState({ morning: [], afternoon: [], evening: [] });

  // adding time of day
  const handleActivityChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleLoadChange = (event) => {
    setLoads(event.target.value);
  };
  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTimeofDayChange = (event) => {
    setTimeofDay(event.target.value)
  }
  const logActivity = () => {
    
    const co2Emission = calculateCO2Emission(activityType, distance, time, loads);

    // add new activiites including the previous activities under the same section
    setActivities((prevActivities) => ({
      ...prevActivities,
      [timeofDay]: [
        ...prevActivities[timeofDay],
        {activityType, distance, time, loads, co2Emission}
      ]
    }))
    // Clear the fields after logging
    setActivityType('');
    setDistance('');
    setTime('');
  };

  const isButtonDisabled =
  !activityType || !timeofDay || (activityType === 'driving' && !distance) || 
  (activityType === 'walking' && !time) || 
  (activityType === 'laundry' && !loads);

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
      <Container align="center"sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 2, boxShadow: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Log Activity
        </Typography>

        {/*time of day selection*/}
        <FormControl >
          <FormLabel>        <Typography variant='h5' sx={{mt:2}} >
          time of day
          </Typography> </FormLabel>
        <RadioGroup row value={timeofDay} onChange={handleTimeofDayChange}>
          <FormControlLabel value="morning" control={<Radio/>} label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <WbSunnyIcon sx={{ marginRight: 1 }} />
                Morning
              </div>
            }/>
            
          <FormControlLabel value="afternoon" control={<Radio/>} label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HouseIcon sx={{ marginRight: 1 }} />
                Afternoon
              </div>
            }/>
          <FormControlLabel value="evening" control={<Radio/>} label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <NightsStayIcon sx={{ marginRight: 1 }} />
                Night
              </div>
            }/>
            
        </RadioGroup>
        </FormControl>
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
          <MenuItem value="laundry">Laundry</MenuItem>

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
        {activityType === 'laundry' && (
          <TextField
            label="Loads (?)"
            type="number"
            value={loads}
            onChange={handleLoadChange}
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
          disabled={isButtonDisabled} 

        >
          Log Activity
        </Button>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Logged Activities
        </Typography>
          {['morning','afternoon','evening'].map((period) => (
            <div key={period}>
              <Typography variant='h6'>{period}</Typography>
              <ul>
                {activities[period].map((activity, idx) => (
                  <li key={idx}>
                {activity.activityType} - CO2 Emission: {activity.co2Emission} kg
              </li>
                )
              )}
              </ul>

            </div>
          )
        )}
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
const calculateCO2Emission = (activityType, distance, time, load) => {
  let co2Emission = 0;

  if (activityType === 'driving') {
    co2Emission = distance * 0.404; // 0.404 kg CO2 per mile driven
  } else if (activityType === 'walking') {
    co2Emission = (time / 30) * 0.06; // 0.06 kg CO2 per 30 minutes walking
  } else if (activityType === 'biking') {
    co2Emission = distance * 0.05; // 0.05 kg CO2 per mile biking
  }
  else if (activityType === 'laundry') {
    co2Emission = load * 3.3; // 0.05 kg CO2 per mile biking
  }
  return co2Emission.toFixed(2); // Return result with 2 decimal places
};

export default LogActivity;
