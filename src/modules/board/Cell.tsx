import { Box } from "@mui/material";
import { useSnakeContext } from "../snake/Snake.context";
import { useMemo } from "react";

type CellProps = {
  positionX: number;
  positionY: number;
};

export const Cell: React.FC<CellProps> = ({ positionX, positionY }) => {
  const { body: snakeBody } = useSnakeContext();

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

  const cellColor = useMemo(() => {
    if (isSnakeHead) {
      return "#ccc";
    }

    if (isSnakeBody) {
      return "#ddd";
    }

    return "#fff";
  }, [isSnakeBody, isSnakeHead]);

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
      }}
    >
      [{positionX}, {positionY}]
    </Box>
  );
};
