import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "@pages/Login";
import Main from "@pages/Main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRequestAction } from "@src/reducer/UserReducer";
import { RootState } from "@src/reducer";
import NotFound from "@pages/NotFound";

export const Router = () => {
  const dispatch = useDispatch();
  const { userInfoSucceed } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(userInfoRequestAction());
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={() => (!userInfoSucceed ? <Login /> : <Redirect to={{ pathname: "/" }} />)}
        ></Route>
        <Route path="/" render={() => (userInfoSucceed ? <Main /> : <Redirect to={{ pathname: "/login" }} />)}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
