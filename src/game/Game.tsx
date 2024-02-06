import { useCallback, useMemo, useState } from "react";
import { GameContext } from "./Game.context";
import { Directions, GameContextType } from "./types";
import { Board } from "./board/Board";
import { MovementController } from "./MovementController";
import { FoodController } from "./FoodController";
import { MainDialog } from "./dialogs/MainDialog";
import {
  GAME_START_DELAY,
  INITIAL_SNAKE_POSITION,
  INITIAL_SNAKE_SPEED,
} from "./settings";
import { CollisionController } from "./CollisionController";
import { useBoolean } from "usehooks-ts";
import { GameResultDialog } from "./dialogs/GameResultDialog";

export const Game = () => {
  const [snakeBody, setSnakeBody] = useState<GameContextType["snakeBody"]>(
    INITIAL_SNAKE_POSITION,
  );
  const [food, setFood] = useState<GameContextType["food"]>([]);
  const [snakeDirection, setSnakeDirection] = useState<Directions>(
    Directions.RIGHT,
  );
  const [snakeSpeed, setSnakeSpeed] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const isMainDialogOpen = useBoolean(true);
  const isGameResultDialogOpen = useBoolean(false);

  const initializeTheGame = useCallback(() => {
    setSnakeDirection(Directions.RIGHT);
    setSnakeBody(INITIAL_SNAKE_POSITION);
    setPoints(0);
    setFood([]);
  }, []);

  const startTheGame = useCallback(() => {
    setSnakeSpeed(INITIAL_SNAKE_SPEED);
  }, []);

  const stopTheGame = useCallback(() => {
    setSnakeSpeed(null);
  }, []);

  const onGameStart = useCallback(() => {
    isMainDialogOpen.setFalse();
    isGameResultDialogOpen.setFalse();
    initializeTheGame();

    setTimeout(startTheGame, GAME_START_DELAY);
  }, [
    isMainDialogOpen,
    isGameResultDialogOpen,
    initializeTheGame,
    startTheGame,
  ]);

  const onSnakeCollision = useCallback(() => {
    stopTheGame();
    isGameResultDialogOpen.setTrue();
  }, [isGameResultDialogOpen, stopTheGame]);

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
      <CollisionController onCollision={onSnakeCollision} />

      <MainDialog isOpen={isMainDialogOpen.value} onGameStart={onGameStart} />

      <GameResultDialog
        isOpen={isGameResultDialogOpen.value}
        onGameRestart={onGameStart}
      />
    </GameContext.Provider>
  );
};
