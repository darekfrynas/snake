import { useCallback, useEffect } from "react";
import { useGameContext } from "./Game.context";
import { useBoolean } from "usehooks-ts";
import random from "lodash/random";
import { CellPosition } from "./types";

export const FoodController = () => {
  const isInitialFoodSpawned = useBoolean(false);

  const { snakeBody, setSnakeBody, food, setFood, board, snakeSpeed } =
    useGameContext();

  const removeFood = useCallback(
    (foodToConsume: CellPosition) => {
      setFood((prevFood) => {
        return prevFood.filter(
          (foodCell) =>
            foodCell.x !== foodToConsume.x && foodCell.y !== foodToConsume.y,
        );
      });
    },
    [setFood],
  );

  const spawnFreshFood = useCallback(() => {
    setFood((prevFood) => {
      return [
        ...prevFood,
        {
          x: random(0, board.width - 1),
          y: random(0, board.height - 1),
        },
      ];
    });
  }, [board.height, board.width, setFood]);

  const growSnakeBody = useCallback(
    (newCellsToGrow: number = 1) => {
      setSnakeBody((prevSnakeBody) => {
        const lastCell = prevSnakeBody.at(-1);

        if (lastCell) {
          const cellsToAdd = [...Array(newCellsToGrow).keys()].map(() => ({
            ...lastCell,
          }));
          return [...prevSnakeBody, ...cellsToAdd];
        }

        return prevSnakeBody;
      });
    },
    [setSnakeBody],
  );

  // Spawn fresh food just after game starts
  useEffect(() => {
    if (!isInitialFoodSpawned.value && !food.length && snakeSpeed) {
      setFood([
        {
          x: random(0, board.width - 1),
          y: random(0, board.height - 1),
        },
      ]);
      isInitialFoodSpawned.setTrue();
    }
  }, [
    board.height,
    board.width,
    food.length,
    isInitialFoodSpawned,
    setFood,
    snakeSpeed,
    spawnFreshFood,
  ]);

  // When head cell goes over food cell, it's time to grow
  useEffect(() => {
    const snakeHead = snakeBody[0];
    const foodToConsume = food.find((foodCell) => {
      return foodCell.x === snakeHead.x && foodCell.y === snakeHead.y;
    });

    if (foodToConsume) {
      removeFood(foodToConsume);
      growSnakeBody();
      spawnFreshFood();
    }
  }, [growSnakeBody, food, snakeBody, setFood, removeFood, spawnFreshFood]);

  return null;
};
