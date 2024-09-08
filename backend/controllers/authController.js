const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login user controller function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Query to find the user by email in the Oracle DB
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT USER_ID, EMAIL, PASSWORD_HASH FROM USERS WHERE EMAIL = :email`,
      [email]
    );

    // Check if the user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Extract user data
    const user = result.rows[0];
    const userId = user[0];
    const storedPasswordHash = user[2];

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(password, storedPasswordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      token,
    });

    // Close the Oracle DB connection
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
