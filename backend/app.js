const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./dbConfig');

const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure value from an environment variable

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads

// Route to fetch all users (for displaying data)
app.get('/', async (req, res) => {
  try {
    const result = await db.executeQuery('SELECT USER_ID, EMAIL FROM users');
    res.json(result.rows); // Send the result to the frontend
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to handle user sign-up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    console.log('Checking if the email exists:', email);
    const userExists = await db.executeQuery('SELECT * FROM users WHERE EMAIL = :email', [email]);

    if (userExists.rows.length > 0) {
      console.log('User with this email already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed:', hashedPassword); // Log the hashed password

    // Insert the new user into the database
    console.log('Inserting user with email:', email);
    const insertResult = await db.executeQuery(
      'INSERT INTO users (USER_ID, EMAIL, PASSWORD_HASH) VALUES (USER_SEQ.NEXTVAL, :email, :password)',
      [email, hashedPassword]
    );

    console.log('User inserted:', insertResult);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Error during sign-up', error });
  }
});


app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log the email being searched for
    console.log('Searching for user with email:', email);

    // Fetch the user from the database by email
    const result = await db.executeQuery('SELECT * FROM users WHERE EMAIL = :email', [email]);

    // Log the result of the query
    console.log('Result from DB:', result.rows);

    // If no user found, return an error
    if (result.rows.length === 0) {
      console.log('No user found with this email');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0]; // The first row
    console.log('User object:', user); // Log the user object

    // Assuming the columns are ordered as USER_ID, EMAIL, PASSWORD_HASH
    const dbPasswordHash = user[2]; // Third column is the PASSWORD_HASH
    const dbEmail = user[1]; // Second column is the EMAIL

    // Log the password from the database and the one provided by the user
    console.log('DB Password Hash:', dbPasswordHash);
    console.log('Entered Password:', password);

    // Compare the entered password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, dbPasswordHash);
    if (!isValidPassword) {
      console.log('Password comparison failed');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If valid, create a JWT token
    const token = jwt.sign({ id: user[0], email: dbEmail }, SECRET_KEY, { expiresIn: '1h' });

    console.log('Sign-in successful');
    res.json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Error during sign-in', error });
  }
});

// Route to log user activities
app.post('/log-activity', async (req, res) => {
  const { userId, activityType, distance, time, co2Emission } = req.body;

  try {
    // Insert the new activity into the USER_ACTIVITIES table
    const insertActivity = await db.executeQuery(
      'INSERT INTO USER_ACTIVITIES (USER_ID, ACTIVITY_TYPE, DISTANCE, TIME, CO2_EMISSION) VALUES (:userId, :activityType, :distance, :time, :co2Emission)',
      [userId, activityType, distance, time, co2Emission]
    );

    res.status(201).json({ message: 'Activity logged successfully' });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ message: 'Error logging activity', error });
  }
});


// Start the server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await db.init(); // Initialize the database connection
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.closePool(); // Close database connection
  process.exit(0);
});
