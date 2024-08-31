// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage'; // Import the new ForgotPasswordPage component
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Add the new route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
