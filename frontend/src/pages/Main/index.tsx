import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";
import Empty from "@components/Empty";
import { GroupModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useHistory } from "react-router-dom";
import { getGroupListAction } from "@src/reducer/GroupReducer";
import ToastManager from "@src/components/ToastMessage/ToastManager";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { groups }: any = useSelector((state: RootState) => state.groups);
  const { userInfoLoading, userProfile, userInfoError, userInfoSucceed, userLoggedOut } = useSelector(
    (state: RootState) => state.user,
  );
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const { target, clientX, clientY } = event;
      dispatch({ type: GroupModalAction.SET_CLICKED_TARGET, payload: { target, clientX, clientY } });
      dispatch({ type: "SET_RIGHT_CLICK_MODAL", payload: false });

      const isClusteringClicked = (target as HTMLElement).getAttribute("src")?.match(/\/icons\/podo-(three|many).png/);
      !isClusteringClicked && dispatch({ type: "CLOSE_INFO_WINDOW" });
    });

    document.addEventListener("contextmenu", () => {
      dispatch({ type: "SET_PROFILE_WRAPPER_MODAL_OPENED", payload: false });
      dispatch({ type: "SET_ALBUM_SETTING_WRAPPER_MODAL_IDX", payload: -1 });
    });
  }, []);

  useEffect(() => {
    if (userProfile) {
      dispatch(getGroupListAction());
    }
  }, [userProfile]);

  useEffect(() => {
    if (userLoggedOut | userInfoError) {
      history.push("/login");
    }
  }, [userLoggedOut, userInfoError]);

  if (userInfoLoading) return <></>;
  return (
    <>
      <Header />
      <Content>
        <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
        {groups.length > 0 ? <Map /> : <Empty />}
      </Content>
      <ModalManager setIsToggle={setIsToggle} />
      <ToastManager />
    </>
  );
};

const Content = styled.div`
  display: flex;
`;
export default Main;
