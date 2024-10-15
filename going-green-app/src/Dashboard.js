import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import BottomNav from './BottomNav';
import backgroundImage from './images/dashboardimage.png'; // Adjust this path

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample Data for Line Chart
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

const yourTrendsDataWeek = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Your Trends (Weekly)',
      data: [100, 200, 150, 300],
      borderColor: '#82ca9d',
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

  const handleYourTrendsPeriodChange = (period) => {
    setYourTrendsPeriod(period);
  };

  const getYourTrendsData = () => {
    return yourTrendsDataWeek; // Return the appropriate dataset (static example)
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Full screen height
        width: '100vw', // Full screen width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center', // Center horizontally
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
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
                <Button variant="outlined" onClick={() => handleYourTrendsPeriodChange('Week')}>
                  Week
                </Button>
                <Button variant="outlined" onClick={() => handleYourTrendsPeriodChange('Month')}>
                  Month
                </Button>
                <Button variant="outlined" onClick={() => handleYourTrendsPeriodChange('Quarter')}>
                  Quarter
                </Button>
                <Button variant="outlined" onClick={() => handleYourTrendsPeriodChange('Year')}>
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

        {/* Bottom Navigation */}
        <BottomNav />
      </Container>
    </div>
  );
};

export default Dashboard;
