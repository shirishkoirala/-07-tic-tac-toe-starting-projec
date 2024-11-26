import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function derivedActivePlayer(gameTurns) {
  let currnetPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currnetPlayer = "O";
  }
  return currnetPlayer
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  })

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = derivedActivePlayer(gameTurns)
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currnetPlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currnetPlayer }, ...prevTurns]
      return updatedTurns
    });
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    }))
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player onChangeName={handlePlayerNameChange} initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReseart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
