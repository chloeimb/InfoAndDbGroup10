// app.js

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

// Middleware to authenticate and authorize admin users
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || !user.isAdmin) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to fetch all users (Admin only)
app.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const result = await db.executeQuery('SELECT USER_ID, EMAIL, IS_ADMIN FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// app.js

// Route to delete a user (Admin only)
app.delete('/users/:id', authenticateAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    await db.executeQuery('DELETE FROM users WHERE USER_ID = :userId', [userId]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// app.js

// Route to update a user's isAdmin status (Admin only)
app.put('/users/:id/admin-status', authenticateAdmin, async (req, res) => {
  const userId = req.params.id;
  const { isAdmin } = req.body;

  try {
    await db.executeQuery('UPDATE users SET IS_ADMIN = :isAdmin WHERE USER_ID = :userId', [isAdmin ? 1 : 0, userId]);
    res.json({ message: 'User admin status updated successfully' });
  } catch (error) {
    console.error('Error updating user admin status:', error);
    res.status(500).json({ message: 'Error updating user admin status' });
  }
});

// app.js

// Route to update a user's email (Admin only)
app.put('/users/:id/email', authenticateAdmin, async (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;

  try {
    await db.executeQuery('UPDATE users SET EMAIL = :email WHERE USER_ID = :userId', [email, userId]);
    res.json({ message: 'User email updated successfully' });
  } catch (error) {
    console.error('Error updating user email:', error);
    res.status(500).json({ message: 'Error updating user email' });
  }
});




// Route to handle user sign-up
app.post('/signup', async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    // Check if user already exists
    const userExists = await db.executeQuery('SELECT * FROM users WHERE EMAIL = :email', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertResult = await db.executeQuery(
      'INSERT INTO users (USER_ID, EMAIL, PASSWORD_HASH, IS_ADMIN) VALUES (USER_SEQ.NEXTVAL, :email, :password, :isAdmin)',
      [email, hashedPassword, isAdmin ? 1 : 0]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Error during sign-up', error });
  }
});

// Route to handle user sign-in
// app.js

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user from the database by email
    const result = await db.executeQuery(
      'SELECT USER_ID, EMAIL, PASSWORD_HASH, IS_ADMIN FROM users WHERE EMAIL = :email',
      [email]
    );

    // If no user found, return an error
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0]; // The first row

    // Extract values
    const userId = user[0];
    const dbEmail = user[1];
    const dbPasswordHash = user[2];
    const isAdmin = user[3]; // IS_ADMIN column

    // Compare the entered password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(password, dbPasswordHash);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If valid, create a JWT token
    const token = jwt.sign({ id: userId, email: dbEmail, isAdmin }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Sign-in successful', token, isAdmin, userId });
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

// Route to fetch user activities
app.get('/user-activities', async (req, res) => {
  const { userId } = req.query; // Get the userId from the query parameters

  try {
    // Fetch activities for the specific user
    const result = await db.executeQuery(
      'SELECT ACTIVITY_TYPE, DISTANCE, TIME, CO2_EMISSION, ACTIVITY_DATE FROM USER_ACTIVITIES WHERE USER_ID = :userId',
      [userId]
    );

    // Send the activities to the frontend
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ message: 'Error fetching user activities' });
  }
});

// app.js

// Route to add a new article (Admin only)
app.post('/articles', authenticateAdmin, async (req, res) => {
  const { title, content, imageUrl, articleUrl } = req.body;

  try {
    await db.executeQuery(
      'INSERT INTO articles (title, content, image_url, article_url) VALUES (:title, :content, :imageUrl, :articleUrl)',
      [title, content, imageUrl, articleUrl]
    );
    res.status(201).json({ message: 'Article added successfully' });
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).json({ message: 'Error adding article' });
  }
});


// Route to fetch all articles (Public)
app.get('/articles', async (req, res) => {
  try {
    const result = await db.executeQuery(
      'SELECT ARTICLE_ID, TITLE, CONTENT, IMAGE_URL, ARTICLE_URL, CREATED_AT FROM articles ORDER BY CREATED_AT DESC'
    );
    // Map the result to an array of objects with named properties
    const articles = result.rows.map((row) => ({
      articleId: row[0],
      title: row[1],
      content: row[2],
      imageUrl: row[3],
      articleUrl: row[4],
      createdAt: row[5],
    }));
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});


// Route to delete an article (Admin only)
app.delete('/articles/:id', authenticateAdmin, async (req, res) => {
  const articleId = req.params.id;

  try {
    await db.executeQuery('DELETE FROM articles WHERE ARTICLE_ID = :articleId', [articleId]);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Error deleting article' });
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
