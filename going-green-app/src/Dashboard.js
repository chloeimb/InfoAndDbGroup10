import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import BottomNav from './BottomNav';

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

// Sample Data for Your Trends Chart
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

const yourTrendsDataMonth = {
  labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
  datasets: [
    {
      label: 'Your Trends (Monthly)',
      data: [300, 500, 400, 700],
      borderColor: '#82ca9d',
      borderWidth: 2,
      fill: false,
    },
  ],
};

const yourTrendsDataQuarter = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Your Trends (Quarterly)',
      data: [600, 400, 800, 1000],
      borderColor: '#82ca9d',
      borderWidth: 2,
      fill: false,
    },
  ],
};

const yourTrendsDataYear = {
  labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
  datasets: [
    {
      label: 'Your Trends (Yearly)',
      data: [1200, 1300, 1100, 1400],
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
  // State for Overall Measurements Dropdown
  const [measurement, setMeasurement] = useState('CO2 Emissions');

  // State for Your Trends time period (Week, Month, Quarter, Year)
  const [yourTrendsPeriod, setYourTrendsPeriod] = useState('Week');

  // Function to change the dataset based on selected time period
  const handleYourTrendsPeriodChange = (period) => {
    setYourTrendsPeriod(period);
  };

  // Choose the appropriate dataset based on the selected time period
  const getYourTrendsData = () => {
    switch (yourTrendsPeriod) {
      case 'Month':
        return yourTrendsDataMonth;
      case 'Quarter':
        return yourTrendsDataQuarter;
      case 'Year':
        return yourTrendsDataYear;
      default:
        return yourTrendsDataWeek;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* World Trends Section */}
      <Box component={Paper} elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          World Trends
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Line data={worldTrendsData} options={chartOptions} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined">Week</Button>
              <Button variant="outlined">Month</Button>
              <Button variant="outlined">Quarter</Button>
              <Button variant="outlined">Year</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Your Trends Section */}
      <Box component={Paper} elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Trends
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Line data={getYourTrendsData()} options={chartOptions} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          </Grid>
        </Grid>
      </Box>

      {/* Overall Measurements Dropdown */}
      <Box sx={{ marginBottom: 3 }}>
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
  );
};

export default Dashboard;
