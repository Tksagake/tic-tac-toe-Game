import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import { db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const Game = ({ user }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = async (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          wins: increment(1)
        });
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tic Tac Toe
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {winner 
          ? `Winner: ${winner}`
          : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </Typography>
      <Grid container spacing={1} sx={{ width: 300, margin: 'auto' }}>
        {board.map((square, i) => (
          <Grid item xs={4} key={i}>
            <Paper
              sx={{
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
              onClick={() => handleClick(i)}
            >
              {square}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button variant="contained" onClick={resetGame}>
          Reset Game
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
