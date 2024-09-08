const oracledb = require('oracledb');
require('dotenv').config();

const connectDB = async () => {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    console.log('Oracle Database connected');
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
