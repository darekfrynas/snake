import React from "react";
import { createGlobalStyle } from "styled-components";
import { Board } from "./modules/Board";

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  
  body {
    background: #000;
    color: white;
    font-family: sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Board width={20} height={20} />
    </>
  );
}

export default App;
