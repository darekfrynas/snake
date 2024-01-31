import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { Game } from "./modules/game/Game";

const App = () => {
  return (
    <>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Game />
      </Container>
    </>
  );
};

export default App;
