import { useMemo, useState } from "react";
import { GameContext } from "./Game.context";
import { Directions, GameContextType } from "./types";
import { Board } from "./board/Board";
import { MovementController } from "./MovementController";
import { FoodController } from "./FoodController";

export const Game = () => {
  const [snakeBody, setSnakeBody] = useState<GameContextType["snakeBody"]>([
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<GameContextType["food"]>([]);
  const [snakeDirection, setSnakeDirection] = useState<Directions>(
    Directions.RIGHT,
  );
  const [snakeSpeed, setSnakeSpeed] = useState<number | null>(null);

  const gameState = useMemo(
    () => ({
      snakeBody,
      setSnakeBody,
      food,
      setFood,
      snakeDirection,
      setSnakeDirection,
      snakeSpeed,
      setSnakeSpeed,
    }),
    [food, snakeBody, snakeDirection, snakeSpeed],
  );

  return (
    <GameContext.Provider value={gameState}>
      <Board />
      <MovementController />
      <FoodController />
    </GameContext.Provider>
  );
};
