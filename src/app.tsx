import CssBaseline from "@mui/material/CssBaseline";
import { Board } from "./modules/board/Board";
import { Container } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Board width={10} height={10} />
      </Container>
    </>
  );
};

export default App;
