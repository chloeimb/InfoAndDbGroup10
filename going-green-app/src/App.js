import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './SignUpPage';
import Signin from './SignInPage';
import Dashboard from './Dashboard';
import LogActivity from './LogActivityPage';  // Import the Log Activity component

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Sign-Up Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Sign-In Page (pass setIsAuthenticated to manage login state) */}
        <Route
          path="/signin"
          element={<Signin setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Dashboard (protected route) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />

        {/* Log Activity Page (protected route) */}
        <Route
          path="/log-activity"
          element={isAuthenticated ? <LogActivity /> : <Navigate to="/signin" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
