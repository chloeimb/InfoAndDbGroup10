// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './SignUpPage';
import Signin from './SignInPage';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard'; // Import the Admin Dashboard
import LogActivity from './LogActivityPage';
import Articles from './Articles';
import Faq from './Faq';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state for isAdmin
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/signin"
          element={
            <Signin
              setIsAuthenticated={setIsAuthenticated}
              setUserId={setUserId}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <AdminDashboard userId={userId} />
              ) : (
                <Dashboard userId={userId} />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/log-activity"
          element={isAuthenticated ? <LogActivity userId={userId} /> : <Navigate to="/signin" />}
        />
        <Route path="/articles" element={isAuthenticated ? <Articles /> : <Navigate to="/signin" />} />
        <Route path="/faq" element={isAuthenticated ? <Faq /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;