// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import PasswordResetPage from './PasswordResetPage';
import Dashboard from './Dashboard';
import LogActivityPage from './LogActivityPage';
import FAQPage from './FAQPage';
import ArticlesPage from './ArticlesPage';
import BottomRibbon from './BottomRibbon'; // Import the BottomRibbon component
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthContext
import { theme } from './theme';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status from context

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-activity"
            element={
              <ProtectedRoute>
                <LogActivityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <ArticlesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {isAuthenticated && <BottomRibbon />} {/* Conditionally render BottomRibbon */}
      </Router>
    </ThemeProvider>
  );
};

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
