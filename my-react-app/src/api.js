// src/services/api.js

import axios from 'axios';

// Set the base URL of your backend server
const API_BASE_URL = 'http://localhost:5000';

// Example function to fetch data from the backend
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

// You can add more functions for different endpoints
