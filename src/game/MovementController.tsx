import { useCallback, useEffect, useMemo } from "react";
import { ArrowKeys, Directions } from "./types";
import { useGameContext } from "./Game.context";
import { useInterval } from "usehooks-ts";

export const MovementController = () => {
  const {
    snakeBody,
    setSnakeBody,
    snakeDirection,
    setSnakeDirection,
    snakeSpeed,
  } = useGameContext();

  const moveBy = useCallback(
    (x: number, y: number) => {
      setSnakeBody((prevSnakeBody) => {
        const snakeHead = prevSnakeBody[0];
        const newHead = { x: snakeHead.x + x, y: snakeHead.y + y };
        const newTail = prevSnakeBody.slice(0, -1);
        return [newHead, ...newTail];
      });
    },
    [setSnakeBody],
  );

  const allowedDirections = useMemo(() => {
    const snakeHead = snakeBody[0];
    const snakeNeck = snakeBody[1];

    if (snakeNeck.x > snakeHead.x) {
      return [Directions.DOWN, Directions.UP, Directions.LEFT];
    } else if (snakeNeck.x < snakeHead.x) {
      return [Directions.DOWN, Directions.UP, Directions.RIGHT];
    } else {
      if (snakeNeck.y > snakeHead.y) {
        return [Directions.UP, Directions.LEFT, Directions.RIGHT];
      } else {
        return [Directions.DOWN, Directions.LEFT, Directions.RIGHT];
      }
    }
  }, [snakeBody]);

  const updateDirection = useCallback(
    (newDirection: Directions) => {
      if (allowedDirections.includes(newDirection)) {
        setSnakeDirection(newDirection);
      }
    },
    [allowedDirections, setSnakeDirection],
  );

  useInterval(() => {
    switch (snakeDirection) {
      case Directions.UP: {
        moveBy(0, -1);
        break;
      }
      case Directions.DOWN: {
        moveBy(0, 1);
        break;
      }
      case Directions.RIGHT: {
        moveBy(1, 0);
        break;
      }
      case Directions.LEFT: {
        moveBy(-1, 0);
        break;
      }
    }
  }, snakeSpeed);

  const onDirectionChange = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case ArrowKeys.UP: {
          updateDirection(Directions.UP);
          break;
        }
        case ArrowKeys.DOWN: {
          updateDirection(Directions.DOWN);
          break;
        }
        case ArrowKeys.RIGHT: {
          updateDirection(Directions.RIGHT);
          break;
        }
        case ArrowKeys.LEFT: {
          updateDirection(Directions.LEFT);
          break;
        }
      }
    },
    [updateDirection],
  );

  useEffect(() => {
    window.addEventListener("keydown", onDirectionChange);

    return () => {
      window.removeEventListener("keydown", onDirectionChange);
    };
  }, [onDirectionChange]);

  return null;
};
