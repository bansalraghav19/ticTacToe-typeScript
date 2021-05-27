import React, { useState } from "react";
import GameBoard from "./components/gameBoard/index";
import InputComponent from "./components/inputComponent/index";
import "./App.css";

const App = () => {
  const [boardSize, setBoardSize] = useState<number>(() => 3);
  const [isGameStarted, setIsGameStated] = useState<boolean>(false);
  return (
    <div className="container">
      {!isGameStarted ? (
        <>
          <h1>Tic Tac Toe</h1>
          <InputComponent
            boardSize={boardSize}
            setBoardSize={setBoardSize}
            setIsGameStated={setIsGameStated}
          />
        </>
      ) : (
        <GameBoard setIsGameStated={setIsGameStated} boardSize={boardSize} />
      )}
    </div>
  );
};

export default App;
