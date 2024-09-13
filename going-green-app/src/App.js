import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './SignUpPage';
import Signin from './SignInPage';
import Dashboard from './Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Track if the user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/signin"
          element={<Signin setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
