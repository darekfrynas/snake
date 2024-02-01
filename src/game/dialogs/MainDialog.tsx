import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useCallback } from "react";
import { useBoolean } from "usehooks-ts";
import { GAME_START_DELAY } from "../settings";

type MainDialogProps = {
  onGameStart: () => void;
};

export const MainDialog: React.FC<MainDialogProps> = ({ onGameStart }) => {
  const isMainDialogOpen = useBoolean(true);

  const onGameStartClick = useCallback(() => {
    isMainDialogOpen.setFalse();

    setTimeout(onGameStart, GAME_START_DELAY);
  }, [isMainDialogOpen, onGameStart]);

  return (
    <Dialog open={isMainDialogOpen.value} fullWidth>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h5">Welcome to the Snake game</Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box>
          <Typography fontWeight={700}>Rules:</Typography>
          <Typography>
            Use arrow keys to change directions.
            <br />
            Eat food to gain points.
            <br />
            If you bite your own tail, you die.
          </Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box sx={{ pb: 2 }}>
          <Button size="large" variant="outlined" onClick={onGameStartClick}>
            Start
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
