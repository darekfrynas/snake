import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  
  body {
    background: #000;
    color: white;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
    </>
  );
}

export default App;
