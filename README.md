**BEING WRITTEN**

1. Prerequisites
   Before beginning, ensure the following tools are installed:
   * Node.js
   * Git
   * Database - Oracle
   * Code Editor - Visual Studio Code
   * npm

2. Clone the Repository

3. Install Dependencies
   After cloning you will need to install the project's dependencies
   * npm install
   * install oracledb

4. (Backend) Set up your environment variables
   * Create a .env file in the backend directory to store sensitive information.

5. Oracle Database Configuration
   * Make sure your Oracle Database is up and running.
   * The database connection will use the credentials you defined in .env.
   * MORE  TABLES WILL BE ADDED BUT CURRENTLY:
   ```
   CREATE TABLE users (
   USER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY,
   EMAIL VARCHAR2(255) UNIQUE,
   PASSWORD_HASH VARCHAR2(255),
   PRIMARY KEY (USER_ID)
   );

   CREATE TABLE activities (
   ACTIVITY_ID NUMBER GENERATED BY DEFAULT AS IDENTITY,
   USER_ID NUMBER,
   ACTIVITY VARCHAR2(255),
   CARBON_IMPACT NUMBER,
   TIMESTAMP DATE DEFAULT SYSDATE,
   PRIMARY KEY (ACTIVITY_ID),
   FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
   );
   ``` 

6. Deploy the app for development and testing.
   * backend -> node app.js
   * frontend -> npm start
