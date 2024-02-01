import { useCallback, useEffect } from "react";
import { ArrowKeys, Directions } from "./types";
import { useGameContext } from "./Game.context";
import { useInterval } from "usehooks-ts";

export const MovementController = () => {
  const { setSnakeBody, snakeDirection, setSnakeDirection, snakeSpeed } =
    useGameContext();

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
          setSnakeDirection(Directions.UP);
          break;
        }
        case ArrowKeys.DOWN: {
          setSnakeDirection(Directions.DOWN);
          break;
        }
        case ArrowKeys.RIGHT: {
          setSnakeDirection(Directions.RIGHT);
          break;
        }
        case ArrowKeys.LEFT: {
          setSnakeDirection(Directions.LEFT);
          break;
        }
      }
    },
    [setSnakeDirection],
  );

  useEffect(() => {
    window.addEventListener("keydown", onDirectionChange);

    return () => {
      window.removeEventListener("keydown", onDirectionChange);
    };
  }, [onDirectionChange]);

  return null;
};
