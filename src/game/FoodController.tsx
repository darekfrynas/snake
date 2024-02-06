import { useCallback, useEffect } from "react";
import { useGameContext } from "./Game.context";
import random from "lodash/random";
import { CellPosition } from "./types";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./settings";

export const FoodController = () => {
  const { snakeBody, setSnakeBody, food, setFood, snakeSpeed, setPoints } =
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
          x: random(0, BOARD_WIDTH - 1),
          y: random(0, BOARD_HEIGHT - 1),
        },
      ];
    });
  }, [setFood]);

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
    if (!food.length && snakeSpeed) {
      setFood([
        {
          x: random(0, BOARD_WIDTH - 1),
          y: random(0, BOARD_HEIGHT - 1),
        },
      ]);
    }
  }, [food.length, setFood, snakeSpeed, spawnFreshFood]);

  // When head cell goes over food cell, it's time to grow
  useEffect(() => {
    const snakeHead = snakeBody[0];
    const foodToConsume = food.find((foodCell) => {
      return foodCell.x === snakeHead.x && foodCell.y === snakeHead.y;
    });

    if (foodToConsume) {
      removeFood(foodToConsume);
      growSnakeBody();
      setPoints((prevPoints) => prevPoints + 1);
      spawnFreshFood();
    }
  }, [
    growSnakeBody,
    food,
    snakeBody,
    setFood,
    removeFood,
    spawnFreshFood,
    setPoints,
  ]);

  return null;
};
