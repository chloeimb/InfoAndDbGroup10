// App.js
import React, { useState } from 'react';
import SignInPage from './SignInPage';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Simulate signing in
  const signIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div>
      {!isSignedIn ? (
        <SignInPage />
      ) : (
        <div>
          <h1>Welcome back!</h1>
          <button onClick={() => setIsSignedIn(false)}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default App;
