import { useCallback, useMemo, useState } from "react";
import { GameContext } from "./Game.context";
import { Directions, GameContextType } from "./types";
import { Board } from "./board/Board";
import { MovementController } from "./MovementController";
import { FoodController } from "./FoodController";
import { MainDialog } from "./dialogs/MainDialog";
import { INITIAL_SNAKE_SPEED } from "./settings";

export const Game = () => {
  const [snakeBody, setSnakeBody] = useState<GameContextType["snakeBody"]>([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<GameContextType["food"]>([]);
  const [snakeDirection, setSnakeDirection] = useState<Directions>(
    Directions.RIGHT,
  );
  const [snakeSpeed, setSnakeSpeed] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);

  const startTheGame = useCallback(() => {
    setSnakeSpeed(INITIAL_SNAKE_SPEED);
  }, []);

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
      points,
      setPoints,
    }),
    [food, snakeBody, snakeDirection, snakeSpeed, points],
  );

  return (
    <GameContext.Provider value={gameState}>
      <Board />

      <MovementController />
      <FoodController />

      <MainDialog onGameStart={startTheGame} />
    </GameContext.Provider>
  );
};
