import { Box } from "@mui/material";
import { useMemo } from "react";
import { useGameContext } from "../game/Game.context";

type CellProps = {
  positionX: number;
  positionY: number;
};

export const Cell: React.FC<CellProps> = ({ positionX, positionY }) => {
  const { snakeBody, food } = useGameContext();

  const snakeBodyPartIndexOverThisCell = useMemo(() => {
    return snakeBody.findIndex(
      (snakeFragment) =>
        snakeFragment.x === positionX && snakeFragment.y === positionY,
    );
  }, [positionX, positionY, snakeBody]);

  const isSnakeHead = useMemo(() => {
    return snakeBodyPartIndexOverThisCell === 0;
  }, [snakeBodyPartIndexOverThisCell]);

  const isSnakeBody = useMemo(() => {
    return snakeBodyPartIndexOverThisCell > 0;
  }, [snakeBodyPartIndexOverThisCell]);

  const isFood = useMemo(() => {
    return (
      food.findIndex(
        (foodPosition) =>
          foodPosition.x === positionX && foodPosition.y === positionY,
      ) >= 0
    );
  }, [food, positionX, positionY]);

  const cellColor = useMemo(() => {
    if (isSnakeHead) {
      return "#ccc";
    }

    if (isSnakeBody) {
      return "#ddd";
    }

    if (isFood) {
      return "red";
    }

    return "#fff";
  }, [isFood, isSnakeBody, isSnakeHead]);

  return (
    <Box
      sx={{
        display: "inline-block",
        width: "50px",
        height: "50px",
        border: "1px solid black",
        ml: "-1px",
        mt: "-1px",
        textAlign: "center",
        color: "#ccc",
        fontSize: "16px",
        background: cellColor,
        lineHeight: "50px",
      }}
    >
      [{positionX}, {positionY}]
    </Box>
  );
};
