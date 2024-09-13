const oracledb = require('oracledb');
require('dotenv').config(); // Load environment variables

async function init() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });
    console.log('Oracle connection pool started');
  } catch (err) {
    console.error('Error starting connection pool', err);
    process.exit(1);
  }
}

async function closePool() {
  try {
    await oracledb.getPool().close(10);
    console.log('Oracle connection pool closed');
  } catch (err) {
    console.error('Error closing connection pool', err);
  }
}

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, params, { autoCommit: true }); // Ensure autoCommit is true for inserts
    return result;
  } catch (err) {
    console.error('Query execution failed', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}


module.exports = {
  init,
  closePool,
  executeQuery,
};
