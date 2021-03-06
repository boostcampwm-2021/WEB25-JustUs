import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled, { keyframes } from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import COLOR from "@styles/Color";
import AddAlbumModal from "@components/Sidebar/SecondDepth/AddAlbum/InputModal";

interface SecondDepthProps {
  isToggle: boolean;
}

const SecondDepth = ({ isToggle }: SecondDepthProps) => {
  const { selectedGroup } = useSelector((state: RootState) => state.groups);
  const { isAddAlbumModalOpened } = useSelector((state: RootState) => state.modal);

  if (!selectedGroup) return null;
  return (
    <SecondDepthWrapper isToggle={isToggle}>
      <SettingGroup />
      <AlbumList />
      {isAddAlbumModalOpened && <AddAlbumModal />}
      <AddAlbum />
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

export default React.memo(SecondDepth);
