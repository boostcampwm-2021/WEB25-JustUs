import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";

const AddAlbum = () => {
  return (
    <AddAlbumWrapper>
      <AddAblumBtnWrapper>
        <img src="/icons/add-album.svg" alt="add-album icon.svg" />
        <GuideWrapper>Add Album</GuideWrapper>
      </AddAblumBtnWrapper>
    </AddAlbumWrapper>
  );
};

const AddAlbumWrapper = styled.div`
  ${flexCenterAlign}
  width: 15vw;
  height: 100px;
  position: fixed;
  bottom: 0;
`;

const AddAblumBtnWrapper = styled.div`
  ${flexCenterAlign}
  height: 5vh;
  border-radius: 10px;
  border: 1px solid ${Color.white};
  width: 85%;
  background: ${Color.blur};
  color: white;
`;

const GuideWrapper = styled.div`
  margin-left: 10px;
`;

export default AddAlbum;
