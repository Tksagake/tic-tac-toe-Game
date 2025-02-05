import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      orderBy('wins', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leaderboardData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeaders(leaderboardData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Leaderboard
      </Typography>
      <Paper elevation={3}>
        <List>
          {leaders.map((user, index) => (
            <ListItem key={user.id} divider={index !== leaders.length - 1}>
              <ListItemText
                primary={`${index + 1}. ${user.email}`}
                secondary={`Wins: ${user.wins}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
