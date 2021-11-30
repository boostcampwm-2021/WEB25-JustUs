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
  const { userInfoError, userLoggedOut, userInfoSucceed } = useSelector((state: RootState) => state.user);
  const { isAddAlbumModalOpened, albumSettingWrapperModalIdx } = useSelector((state: RootState) => state.modal);
  const { isPostCreateWindowOpened } = useSelector((state: RootState) => state.map);

  const history = useHistory();
  const themeNumber = Number(localStorage.getItem("themeNumber"));

  useEffect(() => {
    if (themeNumber) dispatch(ThemeAction.changeThemeAction(themeNumber));

    document.addEventListener("click", (event) => {
      const { target, clientX, clientY } = event;
      const isClusteringClicked = (target as HTMLElement).getAttribute("src")?.match(/\/icons\/podo-(three|many).png/);
      const isPostCreateClicked = (target as HTMLElement).closest("#createPostWindow");

      dispatch(GroupModalAction.setClickedTargetAction({ target, clientX, clientY }));
      isPostCreateWindowOpened &&
        dispatch(MapAction.setPostCreateWindowOpenedAction({ isPostCreateWindowOpened: false }));
      !isClusteringClicked && dispatch(MapAction.closeClusteringWindowAction());
      !isPostCreateClicked && dispatch(MapAction.closePostCreateWindowAction());
    });

    document.addEventListener("contextmenu", () => {
      dispatch(ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: false }));
      if (albumSettingWrapperModalIdx !== -1)
        dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
      if (isAddAlbumModalOpened) dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));
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
      <Spinner />
      <Header />
      <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
      <Content>{groups.length > 0 ? <Map /> : <Empty />}</Content>
      <ModalManager setIsToggle={setIsToggle} />
      <ToastManager />
    </>
  );
};

const Content = styled.main`
  display: flex;
  position: absolute;
  width: calc(100% - 9rem);
  top: 5vh;
  left: 9rem;
`;
export default Main;
