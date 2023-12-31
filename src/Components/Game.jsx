import React, { Component } from "react";
import Board from "./Board";

function calcultateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends Component {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    isNext: true,
  };
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calcultateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      isNext: !this.state.isNext,
    });
  };
  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      isNext: step % 2 === 0,
    });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calcultateWinner(current.squares);
    const moves = history.map((_, move) => {
      const desc = move ? `go to move ${move}` : `go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status = "";
    if (winner) {
      status = `winner ${winner}`;
    } else {
      status = `next player: ${this.state.isNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <b>{status}</b>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
