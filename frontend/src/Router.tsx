import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "@pages/Login";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";
import GlobalStyle from "@styles/StyledComponents/GlobalStyle";

export const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Main}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
