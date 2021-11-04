import styled from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import COLOR from "@styles/Color";

const SecondDepth = () => {
  return (
    <SecondDepthWrapper>
      <SettingGroup />
      <AlbumList />
      <AddAlbum />
    </SecondDepthWrapper>
  );
};

const SecondDepthWrapper = styled.div`
  width: 15vw;
  height: 95vh;
  background-color: ${COLOR.THEME1.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px ${COLOR.WHITE} solid;
  position: absolute;
  left: 5vw;
  z-index: 4;
`;

export default SecondDepth;
