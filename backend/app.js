const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect to Oracle Database
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // Use auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
