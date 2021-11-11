import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
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
}

const SecondDepth = ({
  addAlbumBtnRef,
  isAddAlbumModalOpened,
  setIsAddAlbumModalOpened,
  addAlbumModalRef,
}: SecondDepthProps) => {
  return (
    <SecondDepthWrapper>
      <SettingGroup />
      <AlbumList />
      {isAddAlbumModalOpened && (
        <AddAlbumModal addAlbumModalRef={addAlbumModalRef} setIsAddAlbumModalOpened={setIsAddAlbumModalOpened} />
      )}
      <AddAlbum addAlbumBtnRef={addAlbumBtnRef} />
    </SecondDepthWrapper>
  );
};

const SecondDepthWrapper = styled.div`
  width: 13vw;
  min-width: 10rem;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: grid;
  grid-template-rows: 6vh 1fr 16vh;
  border-left: 1px ${COLOR.WHITE} solid;
  position: absolute;
  left: 5vw;
  z-index: 4;
`;

export default SecondDepth;
