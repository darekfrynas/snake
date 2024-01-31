import { Box } from "@mui/material";
import { useMemo } from "react";
import { Cell } from "./Cell";
import { useGameContext } from "../game/Game.context";

export const Board: React.FC = () => {
  const {
    board: { height: boardHeight, width: boardWidth },
  } = useGameContext();

  const boardRows = useMemo(() => {
    return [...Array(boardHeight).keys()];
  }, [boardHeight]);

  const boardColumns = useMemo(() => {
    return [...Array(boardWidth).keys()];
  }, [boardWidth]);

  return (
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
  );
};
