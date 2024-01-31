import { useState } from "react";
import { GameContext } from "./Game.context";
import { Directions, GameContextType } from "./types";
import { Board } from "../board/Board";
import { MovementController } from "./MovementController";

export const Game = () => {
  const [snakeBody, setSnakeBody] = useState<GameContextType["snakeBody"]>([
    { x: 2, y: 1 },
  ]);
  const [food, setFood] = useState<GameContextType["food"]>([{ x: 5, y: 5 }]);
  const [snakeDirection, setSnakeDirection] = useState<Directions>(
    Directions.RIGHT,
  );
  const [snakeSpeed, setSnakeSpeed] = useState<number | null>(null);

  return (
    <GameContext.Provider
      value={{
        settings: {
          moveMode: "manual",
        },
        board: {
          cellSize: 50,
          width: 10,
          height: 10,
        },
        snakeBody,
        setSnakeBody,
        food,
        setFood,
        snakeDirection,
        setSnakeDirection,
        snakeSpeed,
        setSnakeSpeed,
      }}
    >
      <Board />
      <MovementController />
    </GameContext.Provider>
  );
};
