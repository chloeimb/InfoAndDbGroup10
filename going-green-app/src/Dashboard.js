import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import BottomNav from './BottomNav';
import backgroundImage from './images/dashboardimage.png'; // Adjust this path

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample Data for Line Chart (World Trends remains static)
const worldTrendsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'World Trends',
      data: [400, 300, 500, 700],
      borderColor: '#8884d8',
      borderWidth: 2,
      fill: false,
    },
  ],
};

// Chart options for both charts
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
  },
};

const Dashboard = () => {
  const [yourTrendsPeriod, setYourTrendsPeriod] = useState('Week');
  const [measurement, setMeasurement] = useState('CO2 Emissions');
  const [userActivities, setUserActivities] = useState([]); // State to store user activities

  // Fetch user activities when component mounts
  useEffect(() => {
    const userId = 1; // Replace with the actual user ID from your authentication

    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user-activities?userId=${userId}`);
        console.log("Fetched activities:", response.data); // Log the fetched activities
        
        // Map data to include mock ACTIVITY_DATE for testing
        const mappedActivities = response.data.map((activity, index) => ({
          ACTIVITY_TYPE: activity[0],
          DISTANCE: activity[1],
          TIME: activity[2],
          CO2_EMISSION: activity[3],
          // For testing purposes, use today's date for all activities
          ACTIVITY_DATE: new Date(new Date().setDate(new Date().getDate() - index * 7)).toISOString()
        }));
    
        console.log("Mapped Activities with Mock Dates:", mappedActivities); // Log the modified activities
        setUserActivities(mappedActivities); // Store the modified activities
      } catch (error) {
        console.error('Error fetching user activities:', error);
      }
    };
    

    fetchUserActivities();
  }, []);

  // Function to transform user activity data into chart data based on period
  const getDynamicYourTrendsData = () => {
    let labels = [];
    let co2Emissions = [];

    if (yourTrendsPeriod === 'Week') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      co2Emissions = [0, 0, 0, 0];
      const currentDate = new Date();

      userActivities.forEach((activity) => {
        console.log("Processing Activity for Week:", activity); // Log each activity
        const activityDate = new Date(activity.ACTIVITY_DATE);
        const co2Emission = activity.CO2_EMISSION;

        if (!isNaN(activityDate.getTime())) {
          // Calculate the week difference from current date
          const weekDifference = Math.floor((currentDate - activityDate) / (1000 * 60 * 60 * 24 * 7));
          console.log(`Week Difference: ${weekDifference}, CO2 Emission: ${co2Emission}`);

          if (weekDifference >= 0 && weekDifference < 4) {
            co2Emissions[3 - weekDifference] += co2Emission;
          }
        } else {
          console.error("Invalid date:", activity.ACTIVITY_DATE); // Log any invalid dates
        }
      });
    } else if (yourTrendsPeriod === 'Month') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      co2Emissions = [0, 0, 0, 0];
      const currentDate = new Date();

      userActivities.forEach((activity) => {
        console.log("Processing Activity for Month:", activity); // Log each activity
        const activityDate = new Date(activity.ACTIVITY_DATE);
        const co2Emission = activity.CO2_EMISSION;
        const currentMonth = currentDate.getMonth();
        const activityMonth = activityDate.getMonth();

        if (activityMonth === currentMonth) {
          const weekOfMonth = Math.floor(activityDate.getDate() / 7);
          co2Emissions[weekOfMonth] += co2Emission;
        }
      });
    } else if (yourTrendsPeriod === 'Quarter') {
      labels = ['Month 1', 'Month 2', 'Month 3'];
      co2Emissions = [0, 0, 0];
      const currentDate = new Date();
      const currentQuarter = Math.floor(currentDate.getMonth() / 3);

      userActivities.forEach((activity) => {
        console.log("Processing Activity for Quarter:", activity); // Log each activity
        const activityDate = new Date(activity.ACTIVITY_DATE);
        const co2Emission = activity.CO2_EMISSION;
        const activityQuarter = Math.floor(activityDate.getMonth() / 3);

        if (activityQuarter === currentQuarter) {
          const monthInQuarter = activityDate.getMonth() % 3;
          co2Emissions[monthInQuarter] += co2Emission;
        }
      });
    } else if (yourTrendsPeriod === 'Year') {
      labels = ['Q1', 'Q2', 'Q3', 'Q4'];
      co2Emissions = [0, 0, 0, 0];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      userActivities.forEach((activity) => {
        console.log("Processing Activity for Year:", activity); // Log each activity
        const activityDate = new Date(activity.ACTIVITY_DATE);
        const co2Emission = activity.CO2_EMISSION;
        const activityYear = activityDate.getFullYear();

        if (activityYear === currentYear) {
          const quarter = Math.floor(activityDate.getMonth() / 3);
          co2Emissions[quarter] += co2Emission;
        }
      });
    }

    console.log("Final CO2 Emissions:", co2Emissions); // Log the final data for debugging

    return {
      labels,
      datasets: [
        {
          label: `Your Trends (${yourTrendsPeriod})`,
          data: co2Emissions,
          borderColor: '#82ca9d',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  // Get the dynamic data for the chart
  const getYourTrendsData = () => {
    return getDynamicYourTrendsData();
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
        justifyContent: 'space-between', // Distribute content between top and bottom
        alignItems: 'center',
        paddingTop: '20px',
      }}
    >
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 4, borderRadius: 2, boxShadow: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Grid for Side-by-Side Charts */}
        <Grid container spacing={2}>
          {/* World Trends Section */}
          <Grid item xs={12} md={6}>
            <Box component={Paper} elevation={3} sx={{ padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Typography variant="h5" gutterBottom>
                World Trends
              </Typography>
              <Line data={worldTrendsData} options={chartOptions} height={200} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Button variant="outlined">Week</Button>
                <Button variant="outlined">Month</Button>
                <Button variant="outlined">Quarter</Button>
                <Button variant="outlined">Year</Button>
              </Box>
            </Box>
          </Grid>

          {/* Your Trends Section */}
          <Grid item xs={12} md={6}>
            <Box component={Paper} elevation={3} sx={{ padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Typography variant="h5" gutterBottom>
                Your Trends
              </Typography>
              <Line data={getYourTrendsData()} options={chartOptions} height={200} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Button variant="outlined" onClick={() => setYourTrendsPeriod('Week')}>
                  Week
                </Button>
                <Button variant="outlined" onClick={() => setYourTrendsPeriod('Month')}>
                  Month
                </Button>
                <Button variant="outlined" onClick={() => setYourTrendsPeriod('Quarter')}>
                  Quarter
                </Button>
                <Button variant="outlined" onClick={() => setYourTrendsPeriod('Year')}>
                  Year
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Overall Measurements Dropdown */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Overall Measurements
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="measurement-select-label">Measurement</InputLabel>
            <Select
              labelId="measurement-select-label"
              value={measurement}
              label="Measurement"
              onChange={(event) => setMeasurement(event.target.value)}
            >
              <MenuItem value="CO2 Emissions">CO2 Emissions</MenuItem>
              <MenuItem value="Water Usage">Water Usage</MenuItem>
              <MenuItem value="Energy Consumption">Energy Consumption</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Debugging Information */}
        <Box sx={{ backgroundColor: 'rgba(240, 240, 240, 0.9)', padding: 2, marginTop: 2, borderRadius: 1 }}>
          <Typography variant="h6">Debug Info - Fetched Activities</Typography>
          <pre>{JSON.stringify(userActivities, null, 2)}</pre> {/* Display fetched activities */}
          
          <Typography variant="h6" sx={{ marginTop: 2 }}>Debug Info - Processed CO2 Emissions</Typography>
          <pre>{JSON.stringify(getDynamicYourTrendsData(), null, 2)}</pre> {/* Display processed chart data */}
        </Box>
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

export default Dashboard;
