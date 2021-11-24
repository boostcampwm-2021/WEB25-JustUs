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
import { CLOSE_POST_CREATE_WINDOW, SET_POST_CREATE_WINDOW_OPENED } from "@src/reducer/MapReducer";
import { SET_PROFILE_WRAPPER_MODAL_OPENED, SET_ALBUM_SETTING_WRAPPER_MODAL_IDX } from "@src/reducer/Modal";
import Spinner from "@components/Spinner";
import { CLOSE_CLUSTERING_WINDOW } from "@src/reducer/MapReducer";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { groups, groupListLoaded }: any = useSelector((state: RootState) => state.groups);
  const { spinnerActivate }: any = useSelector((state: RootState) => state.spinner);
  const { userNickName, userInfoError, userLoggedOut } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const { target, clientX, clientY } = event;
      const isClusteringClicked = (target as HTMLElement).getAttribute("src")?.match(/\/icons\/podo-(three|many).png/);
      const isPostCreateClicked = (target as HTMLElement).closest("#createPostWindow");

      dispatch({ type: GroupModalAction.SET_CLICKED_TARGET, payload: { target, clientX, clientY } });
      dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
      !isClusteringClicked && dispatch({ type: CLOSE_CLUSTERING_WINDOW });
      !isPostCreateClicked && dispatch({ type: CLOSE_POST_CREATE_WINDOW });
    });

    document.addEventListener("contextmenu", () => {
      dispatch({ type: SET_PROFILE_WRAPPER_MODAL_OPENED, payload: { isProfileWrapperModalOpened: false } });
      dispatch({ type: SET_ALBUM_SETTING_WRAPPER_MODAL_IDX, payload: { albumSettingWrapperModalIdx: -1 } });
    });
  }, []);

  useEffect(() => {
    if (userNickName) {
      dispatch(getGroupListAction());
    }
  }, [userNickName]);

  useEffect(() => {
    if (userLoggedOut | userInfoError) {
      history.push("/login");
    }
  }, [userLoggedOut, userInfoError]);

  if (!userNickName || !groupListLoaded) {
    return <Spinner />;
  }
  return (
    <>
      {spinnerActivate ? <Spinner /> : null}
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
