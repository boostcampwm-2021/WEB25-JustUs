import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "@pages/Login";
import Main from "@pages/Main";
import NotFound from "@pages/NotFound";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={() => <Login />}></Route>
        <Route path="/" exact component={() => <Main />}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
