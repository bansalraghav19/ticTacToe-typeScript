import React, { useEffect, useRef, useState } from "react";
import "./style.css";

interface Props {
  boardSize: number;
  setIsGameStated: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameBoard: React.FC<Props> = ({ boardSize, setIsGameStated }) => {
  const [isCrossturn, setIsCrossTurn] = useState<boolean>(true);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const isCrossturnRef = useRef<boolean>(true);
  const turnsCounter = useRef<number>(0);

  const removePreviousCells = () => {
    const cellsContainer =
      document.querySelector<HTMLDivElement>(".cellsContainer");
    while (cellsContainer?.firstChild) {
      cellsContainer.removeChild(cellsContainer.firstChild);
    }
  };

  const captureCell = (event: MouseEvent): void => {
    (event.target as Element).classList.add(
      isCrossturnRef.current ? "cross" : "circle"
    );
    turnsCounter.current += 1;
    setIsCrossTurn((prevState) => !prevState);
    isCrossturnRef.current = !isCrossturnRef.current;
  };

  const generateNewGrid = () => {
    const cellsContainer =
      document.querySelector<HTMLDivElement>(".cellsContainer");
    Array(Math.pow(boardSize, 2))
      .fill(0)
      .forEach(() => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.addEventListener("click", captureCell, { once: true });
        cellsContainer?.append(cellElement);
      });
  };

  const addGridLayout = () => {
    const cellsContainer =
      document.querySelector<HTMLDivElement>(".cellsContainer");
    cellsContainer!.style!.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    cellsContainer!.style!.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    cellsContainer!.style!.setProperty("--cell-count", `${boardSize}`);
  };

  const removeEdgeBorders = () => {
    const allCells = Array.from(
      document.querySelectorAll<HTMLElement>(".cell")
    );
    Array(boardSize)
      .fill(0)
      .forEach((_, index) => {
        allCells[index].classList.add("topBorder");
        allCells[Math.pow(boardSize, 2) - index - 1].classList.add(
          "bottomBorder"
        );
        allCells[boardSize * index].classList.add("leftBorder");
        allCells[boardSize * (index + 1) - 1].classList.add("rightBorder");
      });
  };

  useEffect(() => {
    removePreviousCells();
    generateNewGrid();
    addGridLayout();
    removeEdgeBorders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize]);

  const isGameDraw = (): boolean => {
    return turnsCounter.current === Math.pow(boardSize, 2);
  };

  const isCurrentPlayerWin = (): boolean => {
    const currentPlayer = isCrossturn ? "circle" : "cross";
    const allCells = Array.from(
      document.querySelectorAll<HTMLElement>(".cell")
    );
    // checking row-wise win
    let isWinner: boolean = false;
    const boardRow = Array(boardSize).fill(0);
    boardRow.forEach((_, index) => {
      isWinner =
        isWinner ||
        allCells
          .slice(boardSize * index, boardSize * (index + 1))
          .every((cell) => cell.classList.contains(currentPlayer));
    });
    // checking winner column-wise
    boardRow.forEach((_, index) => {
      isWinner =
        isWinner ||
        boardRow.reduce(
          (acc, _) => ({
            status:
              acc.status && allCells[acc.id].classList.contains(currentPlayer),
            id: acc.id + boardSize,
          }),
          { status: true, id: index }
        ).status;
    });
    // checking diognals
    [
      { start: 0, inc: boardSize + 1 },
      { start: boardSize - 1, inc: boardSize - 1 },
    ].forEach(({ start, inc }) => {
      isWinner =
        isWinner ||
        boardRow.reduce(
          (acc, _) => ({
            status:
              acc.status && allCells[acc.id].classList.contains(currentPlayer),
            id: acc.id + inc,
          }),
          { status: true, id: start }
        ).status;
    });
    return isWinner;
  };

  useEffect(() => {
    if (isGameDraw()) {
      setIsGameEnded(true);
      setIsDraw(true);
    } else if (isCurrentPlayerWin()) {
      setIsGameEnded(true);
      setIsDraw(false);
    } else {
      const cellsContainer =
        document.querySelector<HTMLDivElement>(".cellsContainer");
      cellsContainer!.classList.remove("cross");
      cellsContainer!.classList.remove("circle");
      cellsContainer!.classList.add(isCrossturn ? "cross" : "circle");
      cellsContainer!.style.setProperty(
        "--active-color",
        `var(--primary-color${isCrossturn ? "" : "-dark"})`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCrossturn]);

  return (
    <>
      <div className="gbContainer">
        <div className="whoseTurn">
          <span className={`crossTurn ${isCrossturn ? " active" : ""}`}>
            Cross' s Turn
          </span>
          <span className={`circleTurn ${!isCrossturn ? " active" : ""}`}>
            Circle' s Turn
          </span>
        </div>
        <div>
          <div className="cellsContainer"></div>
        </div>
      </div>
      {isGameEnded && (
        <div className="overlay">
          <div className="game-result mb-20">
            {isDraw ? "Draw" : isCrossturn ? "Cicle Wins" : "Cross Wins"}
          </div>
          <button onClick={() => setIsGameStated(false)}>Go Back</button>
        </div>
      )}
    </>
  );
};

export default GameBoard;
