import CssBaseline from "@mui/material/CssBaseline";
import { Container, Typography } from "@mui/material";
import { Game } from "./game/Game";

const App = () => {
  return (
    <>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ pt: 4, textAlign: "center" }}>
        <Typography variant="h5">Snake</Typography>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Game />
      </Container>
    </>
  );
};

export default App;
