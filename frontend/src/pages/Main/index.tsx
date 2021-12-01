import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";
import Empty from "@components/Empty";
import { ThemeAction, UserAction, GroupAction, MapAction, ModalAction } from "@src/action";
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
  const { isAddAlbumModalOpened, albumSettingWrapperModalIdx, isRecommendOpened, isSearchListOpened } = useSelector(
    (state: RootState) => state.modal,
  );
  const { isPostCreateWindowOpened, isClusteringWindowOpened } = useSelector((state: RootState) => state.map);

  const { isProfileWrapperModalOpened } = useSelector((state: RootState) => state.modal);
  const history = useHistory();
  const themeNumber = Number(localStorage.getItem("themeNumber"));

  const clickHandler = (event: MouseEvent) => {
    const { target } = event;
    if (!target) return;
    const nowTarget = target as HTMLElement;

    if (isAddAlbumModalOpened && !nowTarget.closest(".add-album-btn") && !nowTarget.closest(".add-album-modal"))
      dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));

    if (albumSettingWrapperModalIdx !== -1 && !nowTarget.closest(".modifying-album-btn"))
      dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));

    if (isProfileWrapperModalOpened && !nowTarget.closest("#profile"))
      dispatch(ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: false }));

    if (isPostCreateWindowOpened)
      dispatch(MapAction.setPostCreateWindowOpenedAction({ isPostCreateWindowOpened: false }));

    if (isClusteringWindowOpened && !nowTarget.getAttribute("src")?.match(/\/icons\/podo-(three|many).png/))
      dispatch(MapAction.closeClusteringWindowAction());

    if (isPostCreateWindowOpened && !nowTarget.closest("#createPostWindow"))
      dispatch(MapAction.closePostCreateWindowAction());

    if (isSearchListOpened && !nowTarget.closest(".search-container")) {
      dispatch(ModalAction.closeSearchList());
    }
    if (isRecommendOpened && !nowTarget.closest(".search-container")) {
      dispatch(ModalAction.closeRecommendList());
    }
  };

  const contextMenuHandler = () => {
    if (isProfileWrapperModalOpened)
      dispatch(ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: false }));
    if (albumSettingWrapperModalIdx !== -1)
      dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
    if (isAddAlbumModalOpened) dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));
  };

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    document.addEventListener("contextmenu", contextMenuHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("contextmenu", contextMenuHandler);
    };
  }, [
    isAddAlbumModalOpened,
    albumSettingWrapperModalIdx,
    isProfileWrapperModalOpened,
    isPostCreateWindowOpened,
    isRecommendOpened,
    isSearchListOpened,
  ]);

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

  useEffect(() => {
    if (themeNumber) dispatch(ThemeAction.changeThemeAction(themeNumber));
  }, []);

  if (!userInfoSucceed || !groupListLoaded) {
    return <Spinner />;
  }

  return (
    <>
      <Spinner />
      <Header />
      <Content>
        {groups.length > 0 ? (
          <>
            <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
            <Map />
          </>
        ) : (
          <Empty />
        )}
      </Content>
      <ModalManager setIsToggle={setIsToggle} />
      <ToastManager />
    </>
  );
};

const Content = styled.main`
  display: flex;
`;
export default Main;
