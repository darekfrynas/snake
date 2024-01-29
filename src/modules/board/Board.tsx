import { Box } from "@mui/material";
import { useMemo } from "react";
import { Cell } from "./Cell";
import { SnakeController } from "../snake/SnakeController";

type BoardProps = {
  width: number;
  height: number;
};

export const Board: React.FC<BoardProps> = ({ width, height }) => {
  const boardRows = useMemo(() => {
    return [...Array(height).keys()];
  }, [height]);

  const boardColumns = useMemo(() => {
    return [...Array(width).keys()];
  }, [width]);

  return (
    <SnakeController>
      <Box>
        {boardRows.map((positionY) => (
          <Box key={positionY}>
            {boardColumns.map((positionX) => (
              <Cell
                positionX={positionX}
                positionY={positionY}
                key={`${positionY}-${positionX}`}
              />
            ))}
          </Box>
        ))}
      </Box>
    </SnakeController>
  );
};
