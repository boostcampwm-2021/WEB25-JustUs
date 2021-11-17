import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "@pages/Login";
import Main from "@pages/Main";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoRequestAction } from "@src/reducer/UserReducer";
import { RootState } from "@src/reducer";
import NotFound from "@pages/NotFound";

export const Router = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const getUserInfo = useEffect(() => {
    dispatch(userInfoRequestAction());
  }, []);

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
