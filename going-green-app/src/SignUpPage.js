import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To navigate to the sign-in page after sign-up

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('User registered successfully');
      navigate('/signin'); // Redirect to the sign-in page after successful sign-up
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
          Sign Up
        </Typography>

        <form onSubmit={handleSignup} style={{ width: '100%', marginTop: '1rem' }}>
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
            Sign Up
          </Button>
        </form>

        <Typography variant="body1">
          Already have an account?{' '}
          <a href="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign In
          </a>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;
