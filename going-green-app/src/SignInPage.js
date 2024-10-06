import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Signin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To navigate to the dashboard

  const handleSignin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store the token for future use
      setIsAuthenticated(true); // Update the state to indicate the user is logged in
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      alert('Error: ' + data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: 8
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>

        <form onSubmit={handleSignin} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body1">
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signin;
