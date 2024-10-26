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

    // Fetch user activities from the server
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user-activities?userId=${userId}`);
        setUserActivities(response.data); // Store the fetched activities
      } catch (error) {
        console.error('Error fetching user activities:', error);
      }
    };

    fetchUserActivities();
  }, []);

  // Function to transform user activity data into chart data
  const getDynamicYourTrendsData = () => {
    // Group the CO2 emissions by the week based on user activity
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']; // Example labels
    const co2EmissionsByWeek = [0, 0, 0, 0]; // Placeholder for weekly data aggregation

    userActivities.forEach((activity) => {
      // Simple example logic to categorize activities into weeks
      const weekIndex = Math.floor(Math.random() * 4); // Replace with accurate week calculation if needed
      co2EmissionsByWeek[weekIndex] += activity[3]; // Adding CO2 emission (4th column in the result)
    });

    return {
      labels,
      datasets: [
        {
          label: 'Your Trends (Weekly)',
          data: co2EmissionsByWeek,
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
