import styled from "styled-components";
import SettingGroup from "./SettingGroup";
import AlbumList from "./AlbumList";
import AddAlbum from "./AddAlbum";
import Color from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

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
  background-color: ${Color["theme1-primary"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px ${Color.white} solid;
`;

export default SecondDepth;
