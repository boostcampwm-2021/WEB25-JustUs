import { useEffect } from "react";
import Router from "./Router";
import GlobalStyle from "@styles/StyledComponents/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useDispatch } from "react-redux";
import { UserAction } from "@src/action";

function App() {
  const { nowTheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAction.userInfoInitAction());
    dispatch(UserAction.userInfoRequestAction());
  }, []);
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
