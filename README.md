# InfoAndDbGroup10

This is a full-stack web application built using React for the frontend and Node.js with OracleDB for the backend.

## Prerequisites

- Node.js and npm installed. You can download them from [Node.js Official Website](https://nodejs.org/).
- Oracle Database set up and running (local or remote).

## Project Structure

/my-fullstack-app |-- /my-frontend // React app (Frontend) | |-- /public | |-- /src | | |-- /components | | |-- /services | | | |-- api.js | | |-- App.js | | |-- index.js | |-- package.json | |-- /my-backend // Node.js server (Backend) | |-- /node_modules | |-- server.js | |-- package.json | |-- .env


## Setup Instructions

### Backend Setup

1. Navigate to the `my-backend` directory:
    ```bash
    cd my-backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `my-backend` directory with your Oracle database credentials:
    ```plaintext
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_CONNECTION_STRING=your_db_host:your_db_port/your_db_service_name
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    node server.js
    ```

### Frontend Setup

1. Open a new terminal and navigate to the `my-frontend` directory:
    ```bash
    cd my-frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

## Running the Application

1. Ensure your backend server is running.
2. Ensure your frontend server is running.
3. Open your browser and go to `http://localhost:3000` to view the application.

## Building for Production

To create a production build of the React frontend:

1. Navigate to the `my-frontend` directory:
    ```bash
    cd my-frontend
    ```

2. Run the build command:
    ```bash
    npm run build
    ```

3. The production build will be created in the `build` directory inside `my-frontend`.

