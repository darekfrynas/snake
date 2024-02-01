import { Box, Container } from "@mui/material";
import { useMemo } from "react";
import { Cell } from "./Cell";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../settings";
import { useGameContext } from "../Game.context";

export const Board: React.FC = () => {
  const { points } = useGameContext();
  const boardRows = useMemo(() => {
    return [...Array(BOARD_HEIGHT).keys()];
  }, []);

  const boardColumns = useMemo(() => {
    return [...Array(BOARD_WIDTH).keys()];
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mt: 6, border: "2px solid black", display: "inline-block" }}>
          {boardRows.map((positionY) => (
            <Box key={positionY} sx={{ display: "flex" }}>
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

        <Box>Points: {points}</Box>
      </Box>
    </Container>
  );
};
