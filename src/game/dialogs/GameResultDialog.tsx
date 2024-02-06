import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useCallback } from "react";
import { GAME_START_DELAY } from "../settings";
import { useGameContext } from "../Game.context";

type GameResultDialogProps = {
  isOpen: boolean;
  onGameRestart: () => void;
};

export const GameResultDialog: React.FC<GameResultDialogProps> = ({
  isOpen,
  onGameRestart,
}) => {
  const { points } = useGameContext();

  return (
    <Dialog open={isOpen} fullWidth>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h5">Game over!</Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box>
          {/* <Typography fontWeight={700}>Rules:</Typography> */}
          <Typography>You managed to score {points} points.</Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box sx={{ pb: 2 }}>
          <Button size="large" variant="outlined" onClick={onGameRestart}>
            Start again
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
