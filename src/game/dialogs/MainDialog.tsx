import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Divider,
} from "@mui/material";

type MainDialogProps = {
  isOpen: boolean;
  onGameStart: () => void;
};

export const MainDialog: React.FC<MainDialogProps> = ({
  isOpen,
  onGameStart,
}) => {
  return (
    <Dialog open={isOpen} fullWidth>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h5">Welcome to the Snake game</Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box>
          <Typography fontWeight={700}>Rules:</Typography>
          <Typography>
            Use arrows to change directions.
            <br />
            Eat food to gain points.
            <br />
            If you bite your own tail or hit the wall - you die.
          </Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box sx={{ pb: 2 }}>
          <Button size="large" variant="outlined" onClick={onGameStart}>
            Start
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
