import React, { useState } from 'react';
import './App.css';

/**
 * # PUBLIC_INTERFACE
 * Main App containing the Tic Tac Toe Game.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> WebTicTacToe
            </div>
            <span />
          </div>
        </div>
      </nav>
      <main>
        <div className="container main-ttt-container">
          <h1 className="title" style={{ marginTop: '120px' }}>Tic Tac Toe</h1>
          <div className="subtitle" style={{ color: 'var(--ttt-primary)' }}>Play as X or O</div>
          <Game />
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function Game() {
  // 'X' starts the game
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // X always first
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  /**
   * Handles click on a square.
   * @param {number} idx 
   */
  const handleClick = (idx) => {
    // Ignore if won, drawn, or already filled
    if (winner || squares[idx] !== null || isDraw) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);

    // Check for winner/draw after move
    const w = calculateWinner(nextSquares);
    if (w) {
      setWinner(w);
      setIsDraw(false);
    } else if (!nextSquares.includes(null)) {
      setWinner(null);
      setIsDraw(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  /**
   * Resets the game state.
   */
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  let status;
  if (winner) {
    status = (
      <div className="ttt-status" style={{ color: 'var(--ttt-primary)' }}>
        Winner: <span className={`player-mark player-${winner}`}>{winner}</span>
      </div>
    );
  } else if (isDraw) {
    status = (
      <div className="ttt-status" style={{ color: 'var(--ttt-accent)' }}>It's a draw!</div>
    );
  } else {
    status = (
      <div className="ttt-status">
        Next player:&nbsp;
        <span className={`player-mark player-${xIsNext ? 'X' : 'O'}`}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </div>
    );
  }

  return (
    <div className="ttt-root">
      <div className="ttt-status-container">{status}</div>
      <Board squares={squares} onSquareClick={handleClick} />
      <button
        className="btn btn-large ttt-reset-btn"
        style={{
          backgroundColor: 'var(--ttt-primary)',
          color: '#fff',
          marginTop: 24,
        }}
        onClick={handleReset}
      >
        Restart Game
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onSquareClick }) {
  // 3x3 grid
  return (
    <div className="ttt-board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  // Light highlight if filled, outlined if not
  return (
    <button
      className={`ttt-square${value ? ' filled' : ''}`}
      onClick={onClick}
      disabled={!!value}
      tabIndex="0"
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value && (
        <span className={`player-mark player-${value}`}>{value}</span>
      )}
    </button>
  );
}

/**
 * # PUBLIC_INTERFACE
 * Returns 'X' or 'O' if someone wins, else null.
 */
function calculateWinner(sqs) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (sqs[a] && sqs[a] === sqs[b] && sqs[a] === sqs[c]) {
      return sqs[a];
    }
  }
  return null;
}

export default App;