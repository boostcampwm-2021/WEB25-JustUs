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
  const { userInfoSucceed, userInfoLoading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(userInfoRequestAction());
  }, []);

  if (userInfoLoading) return <></>;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Main}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
