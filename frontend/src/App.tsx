import React from "react";
import Main from "./pages/Main";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

export default App;
