import { useCallback, useEffect, useState } from "react";
import { SnakeContext } from "./Snake.context";
import { SnakeBody } from "./types";

type SnakeController = {
  children: React.ReactNode;
};

export const SnakeController: React.FC<SnakeController> = ({ children }) => {
  const [snakeBody, setSnakeBody] = useState<SnakeBody>([
    { x: 2, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -2, y: 1 },
    { x: -3, y: 1 },
  ]);

  const moveUp = useCallback(() => {
    setSnakeBody((prevSnakeBody) => {
      const snakeHead = prevSnakeBody[0];
      const newHead = { y: snakeHead.y - 1, x: snakeHead.x };
      const newTail = prevSnakeBody.slice(0, -1);
      return [newHead, ...newTail];
    });
  }, []);

  const moveDown = useCallback(() => {
    setSnakeBody((prevSnakeBody) => {
      const snakeHead = prevSnakeBody[0];
      const newHead = { y: snakeHead.y + 1, x: snakeHead.x };
      const newTail = prevSnakeBody.slice(0, -1);
      return [newHead, ...newTail];
    });
  }, []);

  const moveRight = useCallback(() => {
    setSnakeBody((prevSnakeBody) => {
      const snakeHead = prevSnakeBody[0];
      const newHead = { y: snakeHead.y, x: snakeHead.x + 1 };
      const newTail = prevSnakeBody.slice(0, -1);
      return [newHead, ...newTail];
    });
  }, []);

  const moveLeft = useCallback(() => {
    setSnakeBody((prevSnakeBody) => {
      const snakeHead = prevSnakeBody[0];
      const newHead = { y: snakeHead.y, x: snakeHead.x - 1 };
      const newTail = prevSnakeBody.slice(0, -1);
      return [newHead, ...newTail];
    });
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp": {
        moveUp();
        break;
      }
      case "ArrowDown": {
        moveDown();
        break;
      }
      case "ArrowRight": {
        moveRight();
        break;
      }
      case "ArrowLeft": {
        moveLeft();
        break;
      }
    }
  }, [moveDown, moveLeft, moveRight, moveUp]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <SnakeContext.Provider value={{ body: snakeBody }}>
      {children}
    </SnakeContext.Provider>
  );
};
