import { useEffect, useMemo } from "react";
import { useGameContext } from "./Game.context";
import range from "lodash/range";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./settings";
import { CellPosition } from "./types";

type CollisionControllerProps = {
  onCollision: () => void;
};

export const CollisionController: React.FC<CollisionControllerProps> = ({
  onCollision,
}) => {
  const { snakeBody, snakeSpeed } = useGameContext();

  const snakeTail = useMemo(() => {
    const [, ...tail] = snakeBody;
    return tail;
  }, [snakeBody]);

  const boardEdges = useMemo(() => {
    const verticalEdges: CellPosition[] = [];
    range(0, BOARD_HEIGHT).forEach((posY) => {
      verticalEdges.push({ x: -1, y: posY });
      verticalEdges.push({ x: BOARD_WIDTH, y: posY });
    });
    const horizontalEdges: CellPosition[] = [];
    range(0, BOARD_WIDTH).forEach((posX) => {
      verticalEdges.push({ x: posX, y: -1 });
      verticalEdges.push({ x: posX, y: BOARD_HEIGHT });
    });

    return [...verticalEdges, ...horizontalEdges];
  }, []);

  const collisionCells = useMemo(() => {
    return [...snakeTail, ...boardEdges];
  }, [boardEdges, snakeTail]);

  useEffect(() => {
    const snakeHead = snakeBody[0];
    const isCollisionDetected = collisionCells.some(
      (cell) => cell.x === snakeHead.x && cell.y === snakeHead.y,
    );

    if (snakeSpeed && isCollisionDetected) {
      onCollision();
    }
  }, [collisionCells, onCollision, snakeBody, snakeSpeed]);

  return null;
};
