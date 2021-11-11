import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled, { keyframes } from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import COLOR from "@styles/Color";
import AddAlbumModal from "@components/Sidebar/SecondDepth/AddAlbum/InputModal";

interface SecondDepthProps {
  addAlbumBtnRef: React.RefObject<HTMLDivElement>;
  isAddAlbumModalOpened: boolean;
  setIsAddAlbumModalOpened: Dispatch<SetStateAction<boolean>>;
  addAlbumModalRef: React.RefObject<HTMLDivElement>;
  isToggle: boolean;
}

const SecondDepth = ({
  isToggle,
  addAlbumBtnRef,
  isAddAlbumModalOpened,
  setIsAddAlbumModalOpened,
  addAlbumModalRef,
}: SecondDepthProps) => {
  useEffect(() => {
    console.log(isToggle);
  });
  const { selectedGroup } = useSelector((state: RootState) => state.groups);
  if (!selectedGroup) return null;
  return (
    <SecondDepthWrapper isToggle={isToggle}>
      <SettingGroup />
      <AlbumList />
      {isAddAlbumModalOpened && (
        <AddAlbumModal addAlbumModalRef={addAlbumModalRef} setIsAddAlbumModalOpened={setIsAddAlbumModalOpened} />
      )}
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
    z-index:4;
  }
  to {
    z-index:0;
    transform: translateX(-20vw);
  }
`;
const SecondDepthWrapper = styled.div<{ isToggle: boolean }>`
  width: 13vw;
  min-width: 10rem;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: grid;
  grid-template-rows: 6vh 1fr 16vh;
  border-left: 1px ${COLOR.WHITE} solid;
  position: absolute;
  left: 5vw;
  z-index: ${(props) => (props.isToggle ? 4 : 0)};
  animation-name: ${(props) => (props.isToggle ? SidebarOpen : SidebarHide)};
  animation-duration: 1s;
`;

export default SecondDepth;
