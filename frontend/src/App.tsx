import Router from "./Router";
import GlobalStyle from "@styles/StyledComponents/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

function App() {
  const { nowTheme } = useSelector((state: RootState) => state.theme);
  return (
    <>
      <ThemeProvider theme={nowTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
