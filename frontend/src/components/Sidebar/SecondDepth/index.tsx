import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled, { keyframes } from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import COLOR from "@styles/Color";
import AddAlbumModal from "@components/Sidebar/SecondDepth/AddAlbum/InputModal";
import { ModalAction } from "@src/action";

interface SecondDepthProps {
  addAlbumBtnRef: React.RefObject<HTMLDivElement>;
  addAlbumModalRef: React.RefObject<HTMLDivElement>;
  isToggle: boolean;
}

const SecondDepth = ({ isToggle, addAlbumBtnRef, addAlbumModalRef }: SecondDepthProps) => {
  const { selectedGroup } = useSelector((state: RootState) => state.groups);
  const { isAddAlbumModalOpened } = useSelector((state: RootState) => state.modal);
  const { clickedTarget } = useSelector((state: RootState) => state.groupModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const addAlbumBtn = clickedTarget.target.closest(".add-album-btn");
    const addAlbumModal = clickedTarget.target.closest(".add-album-modal");
    if (!addAlbumBtn && !addAlbumModal) dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));
  }, [clickedTarget]);

  if (!selectedGroup) return null;
  return (
    <SecondDepthWrapper isToggle={isToggle}>
      <SettingGroup />
      <AlbumList />
      {isAddAlbumModalOpened && <AddAlbumModal addAlbumModalRef={addAlbumModalRef} />}
      <AddAlbum addAlbumBtnRef={addAlbumBtnRef} />
    </SecondDepthWrapper>
  );
};
const SidebarOpen = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-13vw);
  }
  30% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SidebarHide = keyframes`
  from {
    transform: translateX(0);
    z-index:6;
  }
  to {
    z-index:0;
    transform: translateX(-20vw);
  }
`;
const SecondDepthWrapper = styled.div<{ isToggle: boolean }>`
  width: 20rem;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: grid;
  grid-template-rows: 6vh 1fr 16vh;
  border-left: 1px ${COLOR.WHITE} solid;
  position: absolute;
  left: 9rem;
  z-index: ${(props) => (props.isToggle ? 6 : 0)};
  animation-name: ${(props) => (props.isToggle ? SidebarOpen : SidebarHide)};
  animation-duration: 1s;
`;

export default SecondDepth;
