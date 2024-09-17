import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './SignUpPage';
import Signin from './SignInPage';
import Dashboard from './Dashboard';
import LogActivity from './LogActivityPage';
import Articles from './Articles'; // Import the Articles component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Track the logged-in user's ID

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard userId={userId} /> : <Navigate to="/signin" />} />
        <Route path="/log-activity" element={isAuthenticated ? <LogActivity userId={userId} /> : <Navigate to="/signin" />} />
        <Route path="/articles" element={isAuthenticated ? <Articles /> : <Navigate to="/signin" />} /> {/* Articles Route */}
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
