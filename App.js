import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard'; // Make sure the import is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Directly render Dashboard */}
        <Route path="/" element={<Dashboard />} /> {/* Also render Dashboard at root */}
      </Routes>
    </Router>
  );
}

export default App;
