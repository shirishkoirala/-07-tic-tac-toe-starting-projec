import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function derivedActivePlayer(gameTurns) {
  let currnetPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currnetPlayer = "O";
  }
  return currnetPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  
  let activePlayer = derivedActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currnetPlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currnetPlayer }, ...prevTurns]
      return updatedTurns
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
