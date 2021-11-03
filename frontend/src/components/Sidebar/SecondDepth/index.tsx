import styled from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import color from "@styles/Color";

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
  height: 100vh;
  background-color: ${color.theme1.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px ${color.white} solid;
`;

export default SecondDepth;
