import Router from "./Router";
import GlobalStyle from "@styles/StyledComponents/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Login from "@pages/Login";

function App() {
  const { nowTheme } = useSelector((state: RootState) => state.theme);
  return (
    <>
      <ThemeProvider theme={nowTheme}>
        <GlobalStyle />
        <Login />
      </ThemeProvider>
    </>
  );
}

export default App;
