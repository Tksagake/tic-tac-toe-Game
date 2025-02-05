import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Box, Button } from '@mui/material';
import Game from './components/Game';
import Auth from './components/Auth';
import Leaderboard from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!user) {
    return (
      <Container>
        <Auth />
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={handleSignOut} variant="outlined" sx={{ mr: 1 }}>
          Sign Out
        </Button>
        <Button 
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          variant="outlined"
        >
          {showLeaderboard ? 'Show Game' : 'Show Leaderboard'}
        </Button>
      </Box>
      {showLeaderboard ? <Leaderboard /> : <Game user={user} />}
    </Container>
  );
}

export default App;
