import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";
import Empty from "@components/Empty";
import { GroupModalAction, ThemeAction, UserAction, GroupAction, MapAction, ModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useHistory } from "react-router-dom";
import ToastManager from "@src/components/ToastMessage/ToastManager";
import Spinner from "@components/Spinner";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { groups, groupListLoaded }: any = useSelector((state: RootState) => state.groups);
  const { spinnerActivate }: any = useSelector((state: RootState) => state.spinner);
  const { userInfoError, userLoggedOut, userInfoSucceed } = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const themeNumber = Number(localStorage.getItem("themeNumber"));

  useEffect(() => {
    if (themeNumber) dispatch(ThemeAction.changeThemeAction(themeNumber));

    document.addEventListener("click", (event) => {
      const { target, clientX, clientY } = event;
      const isClusteringClicked = (target as HTMLElement).getAttribute("src")?.match(/\/icons\/podo-(three|many).png/);
      const isPostCreateClicked = (target as HTMLElement).closest("#createPostWindow");

      dispatch(GroupModalAction.setClickedTargetAction({ target, clientX, clientY }));
      dispatch(MapAction.setPostCreateWindowOpenedAction({ isPostCreateWindowOpened: false }));
      !isClusteringClicked && dispatch(MapAction.closeClusteringWindowAction());
      !isPostCreateClicked && dispatch(MapAction.closePostCreateWindowAction());
    });

    document.addEventListener("contextmenu", () => {
      dispatch(ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: false }));
      dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
      dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));
    });
  }, []);

  useEffect(() => {
    if (userInfoSucceed) {
      dispatch(GroupAction.getGroupListAction());
      dispatch(UserAction.setUpdatedInitAction());
    }
  }, [userInfoSucceed]);

  useEffect(() => {
    if (userLoggedOut | userInfoError) {
      history.push("/login");
    }
  }, [userLoggedOut, userInfoError]);

  if (!userInfoSucceed || !groupListLoaded) {
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
